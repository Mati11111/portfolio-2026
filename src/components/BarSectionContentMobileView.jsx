import { useEffect, useState, useMemo } from "react";

export default function BarSectionContentMobileView({
  experienceContent,
  careerContent,
  projectsContent,
}) {
  const experiences = useMemo(
    () => JSON.parse(experienceContent),
    [experienceContent],
  );
  const careers = useMemo(() => JSON.parse(careerContent), [careerContent]);
  const projects = useMemo(
    () => JSON.parse(projectsContent),
    [projectsContent],
  );

  const [allFrameworks, setAllFrameworks] = useState([]);
  const [frameworkCount, setFrameworkCount] = useState({});
  const [totalProjects, setTotalProjects] = useState(0);
  const [frameworkDetails, setFrameworkDetails] = useState([]);
  const [hTopHeaders, setHTopHeaders] = useState([]);
  //bars are always sorted by experience time
  const sorterOption = "experience_time";

  //convert an experience_time label ("3 AÑOS", "8 MESES", "1 AÑO") into months
  const monthsFromExperience = (str = "") => {
    if (!str) return 0;
    const number = parseInt(str, 10) || 0;
    const isYears = /(a[nñ]o|year)/i.test(str);
    return isYears ? number * 12 : number;
  };

  //most experienced framework (in months) -> used as 100% reference for the bars
  const maxMonths = useMemo(() => {
    const values = Object.values(frameworkDetails).map((d) =>
      monthsFromExperience(d?.experience_time),
    );
    return values.length ? Math.max(...values) : 0;
  }, [frameworkDetails]);

  //bar width relative to the most experienced framework (min 8% so short ones stay visible)
  const getPercent = (frameworkName) => {
    const months = monthsFromExperience(
      frameworkDetails[frameworkName]?.experience_time,
    );
    if (!maxMonths || !months) return 0;
    return Math.max((months / maxMonths) * 100, 8);
  };

  useEffect(() => {
    //set projects amount (experiences+careers+projects)
    const total = experiences.length + careers.length + projects.length;
    //set all framework names
    const allFrameworksList = [...experiences, ...careers, ...projects].flatMap(
      (section) => section.frameworks || [],
    );
    //set framework count
    const countMap = allFrameworksList.reduce((amount, framework) => {
      amount[framework] = (amount[framework] || 0) + 1;
      return amount;
    }, {});
    //set framework details
    const allFrameworkDetails = [
      ...experiences,
      ...careers,
      ...projects,
    ].flatMap((section) => section["about_frameworks"] || []);

    //add framework details to map
    const detailsMap = allFrameworkDetails.reduce((list, item) => {
      list[item.framework] = item;
      return list;
    }, {});

    //always order by experience time (months) -> highest first
    const orderedFrameworks = Object.keys(countMap).sort((a, b) => {
      const monthsA = monthsFromExperience(detailsMap[a]?.experience_time);
      const monthsB = monthsFromExperience(detailsMap[b]?.experience_time);
      if (monthsB !== monthsA) return monthsB - monthsA;
      return a.localeCompare(b);
    });

    setFrameworkCount(countMap);
    setTotalProjects(total);

    setHTopHeaders(projects[0]["framework-headers"] || []);
    setAllFrameworks(orderedFrameworks);
    setFrameworkDetails(detailsMap);
  }, [experiences, careers, projects, sorterOption]);
  //show framework content (compact table for mobile -> same items as the bars)
  function renderData() {
    return (
      <>
        {allFrameworks.slice(0, 6).map((item, index) => {
          const details = frameworkDetails[item];
          return (
            <tr
              key={item}
              className={`cursor-default border border-solid border-bg-secondary text-text-secondary
              ${index === 0 ? "bg-bg-primary text-text-tertiary border-t-bg-primary" : ""}`}
            >
              <td className="pl-1">{item}</td>
              <td>{details?.area || "—"}</td>
              <td>{details?.language || "—"}</td>
              <td>{details?.experience_time || "—"}</td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <div className="flex flex-col h-full w-full justify-start gap-y-4 min-h-0">
      <section className="flex flex-row gap-x-2 shrink-0">
        <section className="flex flex-col gap-y-2 w-full">
          {allFrameworks.slice(0, 6).map((frameworkName) => {
            const percent = getPercent(frameworkName);

            return (
              <div
                key={frameworkName}
                className="flex items-center gap-3 w-full text-ellipsis"
              >
                <span className="text-text-secondary text-sm truncate w-20">
                  {frameworkName}
                </span>
                <div className="dotted-bar flex-1 h-6 overflow-hidden">
                  <div
                    className="bg-variant h-full animate-growBar"
                    style={{ "--bar-width": `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </section>
      <section className="flex flex-col shrink-0">
        <table className="w-full table-fixed text-[0.65rem]">
          <thead className="bg-variant text-text-same sticky top-0 text-nowrap text-ellipsis">
            <tr>
              {hTopHeaders
                .filter((header) => header.id !== "projects_amount")
                .map((header) => (
                  <th
                    key={header.id}
                    className={`text-left font-light pl-1 truncate
                    ${sorterOption === header.id ? "bg-bg-primary text-text-tertiary" : ""}`}
                  >
                    {header.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y">{renderData()}</tbody>
        </table>
      </section>
    </div>
  );
}
