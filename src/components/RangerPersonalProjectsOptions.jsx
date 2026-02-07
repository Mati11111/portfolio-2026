import { useState } from "react";

export default function RangerPersonalProjectsOptions({ content }) {
  const parsedContent = JSON.parse(content);
  const [experience, setExperience] = useState(0);
  return (
    <div className="flex flex-row h-full ">
      <section className="w-1/4 h-full pt-2 overflow-y-scroll">
        <ul>
          {parsedContent.map((item, index) => (
            <li
              key={index}
              onClick={() => setExperience(index)}
              className={`xl:text-[1.3rem] md:text-sm text-nowrap overflow-hidden text-ellipsis cursor-pointer! font-medium border pl-1
           ${
             index === experience
               ? "bg-variant text-text border-variant"
               : "bg-bg-secondary border border-bg-secondary text-primary"
           }`}
            >
              {item.project_title}
            </li>
          ))}
        </ul>
      </section>
      <section className="w-3/4 border-l-2 ml-2 border-bg-primary text-text-secondary overflow-y-scroll">
        <div id="rightList" className="p-5 flex flex-col gap-y-10">
          <div className="flex flex-col justify-between">
            <h1 id="right-role" class="font-medium xl:text-2xl md:text-sm">
              {parsedContent[experience].project_title}
            </h1>
            <span
              id="right-role"
              class="font-light xl:text-[1rem] md:text-sm mb-3"
            >
              {parsedContent[experience].status}
            </span>
            <span id="right-date" class="xl:text-2xl md:text-sm">
              {parsedContent[experience].date}
            </span>
          </div>
          <p id="right-description" class="xl:text-2xl md:text-sm text-justify">
            {parsedContent[experience].description}
          </p>
          <section className="flex flex-row justify-end h-fit w-full pr-0 p-1 -mr-2">
            <div className="flex gap-2 text-sm md:overflow-x-auto md:whitespace-nowrap md:max-w-full">
              {parsedContent[experience].frameworks
                .slice(0, 5)
                .map((framework, index) => (
                  <div key={index}>
                    <p className="xl:text-sm md:text-[0.5rem] text-nowrap">
                      {framework}
                      {index === 4 ? "" : " | "}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
