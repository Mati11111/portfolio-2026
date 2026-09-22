import { useEffect, useState, useMemo } from "react";
import LeftIcon from "@/assets/left-icon.svg?url";
import LeftIconDark from "@/assets/left-icon-dark-mode.svg?url";

export default function BarSectionContent({
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [frameworkDetails, setFrameworkDetails] = useState([]);
  const [hTopHeaders, setHTopHeaders] = useState([]);
  //table sorting -> starts by experience time, can be changed from the headers
  const [sorterOption, setSorterOption] = useState("experience_time");

  //convert an experience_time label ("3 AÑOS", "8 MESES", "1 AÑO") into months
  const monthsFromExperience = (str = "") => {
    if (!str) return 0;
    const number = parseInt(str, 10) || 0;
    const isYears = /(a[nñ]o|year)/i.test(str);
    return isYears ? number * 12 : number;
  };

  //table rows sorted by the selected column
  const sortedTableFrameworks = useMemo(() => {
    return [...allFrameworks].sort((a, b) => {
      switch (sorterOption) {
        //most experienced first
        case "experience_time":
          return (
            monthsFromExperience(frameworkDetails[b]?.experience_time) -
            monthsFromExperience(frameworkDetails[a]?.experience_time)
          );
        //most used first
        case "projects_amount":
          return (frameworkCount[b] || 0) - (frameworkCount[a] || 0);
        //alphabetical
        case "area":
          return (frameworkDetails[a]?.area || "").localeCompare(
            frameworkDetails[b]?.area || "",
          );
        case "language":
          return (frameworkDetails[a]?.language || "").localeCompare(
            frameworkDetails[b]?.language || "",
          );
        case "framework":
        default:
          return a.localeCompare(b);
      }
    });
  }, [allFrameworks, sorterOption, frameworkDetails, frameworkCount]);

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
  }, [experiences, careers, projects]);
  //show framework content
  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = sortedTableFrameworks.slice(startIndex, endIndex);
    return (
      <>
        {currentItems.map((item, index) => {
          const details = frameworkDetails[item];
          return (
            <tr
              key={item}
              className={`cursor-default max-w-10 border border-solid border-bg-secondary text-text-secondary
              ${index === 0 && startIndex === 0 ? "bg-bg-primary text-text-tertiary border-t-bg-primary" : ""}`}
            >
              <td>{item}</td>
              <td>{details?.area || "—"}</td>
              <td>{details?.language || "—"}</td>
              <td>{frameworkCount[item] ?? "—"}</td>
              <td>{details?.experience_time || "—"}</td>
            </tr>
          );
        })}
      </>
    );
  }
  //framework ->go to next page
  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  //framework ->go to previous page
  function goToPrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }
  //show framework buttons
  function renderPaginationControls() {
    const totalPages = Math.ceil(allFrameworks.length / itemsPerPage);
    return (
      <div className="flex flex-row gap-x-10">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          <img
            src={LeftIcon}
            alt="Previous"
            className={`w-6 h-6 transition-all duration-300 ease-in-out dark:hidden
            ${currentPage === 1 ? "cursor-default opacity-60" : "cursor-pointer"}
            `}
          />
          <img
            src={LeftIconDark}
            alt="Previous"
            className={`w-6 h-6 transition-all duration-300 ease-in-out hidden dark:block
            ${currentPage === 1 ? "cursor-default opacity-60" : "cursor-pointer"}
            `}
          />
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <img
            src={LeftIcon}
            alt="Next"
            className={`w-6 h-6 transition-all duration-300 rotate-180 ease-in-out dark:hidden
            ${currentPage === totalPages ? "cursor-default opacity-60" : "cursor-pointer"}
            `}
          />
          <img
            src={LeftIconDark}
            alt="Next"
            className={`w-6 h-6 transition-all duration-300 rotate-180 ease-in-out hidden dark:block
            ${currentPage === totalPages ? "cursor-default opacity-60" : "cursor-pointer"}
            `}
          />
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[90%] w-full gap-y-10">
      <section className="flex flex-row justify-between gap-x-2">
        <section className="flex flex-col gap-y-2 w-1/2">
          {allFrameworks.slice(0, 4).map((frameworkName) => {
            const percent = getPercent(frameworkName);

            return (
              <div
                key={frameworkName}
                className="flex items-center gap-3 w-full text-ellipsis"
              >
                <span className="text-text-secondary text-sm truncate w-30">
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
        <section className="flex flex-col gap-y-2 w-1/2 ">
          {allFrameworks.slice(4, 8).map((frameworkName) => {
            const percent = getPercent(frameworkName);

            return (
              <div
                key={frameworkName}
                className="flex items-center gap-3 w-full"
              >
                <span className=" text-text-secondary text-sm truncate w-30">
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
      <section className="flex flex-col overflow-y-auto flex-1 min-h-0">
        <div className="w-full flex-1  min-h-0">
          <table className="w-full table-fixed">
            <thead
              className={`bg-variant text-text-same sticky top-0 text-nowrap text-ellipsis`}
            >
              <tr>
                {hTopHeaders.map((header) => (
                  <th
                    onClick={() => {
                      setSorterOption(header.id);
                      setCurrentPage(1);
                    }}
                    key={header.id}
                    className={` text-left font-light
                  ${sorterOption === header.id ? "bg-bg-primary text-text-tertiary cursor-default" : "cursor-pointer"} `}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y ">{renderData()}</tbody>
          </table>
        </div>
        <div className="flex flex-row justify-around mt-5">
          {renderPaginationControls()}
        </div>
      </section>
    </div>
  );
}
