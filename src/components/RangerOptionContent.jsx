export default function RangerOptionContent({ content = "", experience = 0 }) {
  const parsedContent = JSON.parse(content);
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0">
      <hr className="md:inline lg:hidden border-selected border-t w-full mb-5" />
      <section
        className="lg:w-3/4 md:w-full md:flex-3 lg:h-full min-h-0
        lg:border-l-2 md:border-l-0 ml-2 border-selected
        text-text-secondary overflow-y-auto"
      >
        <div
          id="rightList"
          className="lg:p-5 md:p-1 flex flex-col h-full min-h-0 overflow-y-scroll lg:gap-10 gap-4 pb-6"
        >
          <div className="flex flex-col lg:justify-between md:justify-start">
            <h1
              id="right-role"
              className="font-medium xl:text-2xl md:text-sm lg:border-none"
            >
              {parsedContent[experience].role ||
                parsedContent[experience].company_name}
            </h1>
            <span
              id="right-role"
              className="font-light xl:text-[1rem] md:text-sm mb-3"
            >
              {parsedContent[experience].status
                ? parsedContent[experience].status
                : parsedContent[experience].company_name}
            </span>
            <span id="right-date" className="xl:text-2xl md:text-sm">
              {parsedContent[experience].date}
            </span>
          </div>
          <p
            id="right-description"
            className="
    text-justify
    md:text-sm lg:text-base
    md:mr-5 lg:mr-0
    md:-mt-5 lg:mt-0
    md:w-[95%] lg:w-full
  "
          >
            {parsedContent[experience].description}
          </p>
          <section className="flex flex-row lg:justify-end md:justify-start h-fit w-full pr-0 p-1 lg:-mr-2 lg:mt-auto shrink-0">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm lg:justify-end md:justify-start">
              {parsedContent[experience].frameworks
                .slice(0, 5)
                .map((framework, index, list) => (
                  <p
                    key={index}
                    className="xl:text-sm md:text-[0.6rem] text-nowrap"
                  >
                    {framework}
                    {index === list.length - 1 ? "" : " | "}
                  </p>
                ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
