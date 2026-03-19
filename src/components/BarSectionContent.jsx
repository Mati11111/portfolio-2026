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
  const [sorterOption, setSorterOption] = useState("projects_amount");

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

    const orderedFrameworks = Object.keys(countMap).sort((a, b) => {
      const detailsA = detailsMap[a];
      const detailsB = detailsMap[b];

      switch (sorterOption) {
        //sort by projects amount
        case "projects_amount":
          return countMap[b] - countMap[a];
        //sort by area -> a-z
        case "area":
          return (detailsA?.area || "").localeCompare(detailsB?.area || "");
        //sort by programming language -> a-z
        case "language":
          return (detailsA?.language || "").localeCompare(
            detailsB?.language || "",
          );
        //sort by experience amount
        case "experience_time": {
          const getYears = (str = "") => {
            if (!str) return 0;
            const number = parseInt(str) || 0;
            const isMonths = str.toUpperCase().includes("M");
            return isMonths ? number / 12 : number;
          };
          return (
            getYears(detailsB?.experience_time) -
            getYears(detailsA?.experience_time)
          );
        }
        //sort by framework -> a-z (inital case)
        default:
          return a.localeCompare(b);
      }
    });

    setFrameworkCount(countMap);
    setTotalProjects(total);

    setHTopHeaders(projects[0]["framework-headers"] || []);
    setAllFrameworks(orderedFrameworks);
    setFrameworkDetails(detailsMap);
  }, [experiences, careers, projects, sorterOption]);
  //show framework content
  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = allFrameworks.slice(startIndex, endIndex);
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
            const count = frameworkCount[frameworkName];
            const percent = totalProjects ? (count / totalProjects) * 100 : 0;

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
            const count = frameworkCount[frameworkName];
            const percent = totalProjects ? (count / totalProjects) * 100 : 0;

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
                    onClick={() => setSorterOption(header.id)}
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
