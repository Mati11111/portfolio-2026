import { useState } from "react";
import RangerOptionSelectorMobileView from "@/components/RangerOptionSelectorMobileView";
import RangerOptionSelector from "@/components/RangerOptionSelector";
import RangerOptionContent from "./RangerOptionContent";

export default function RangerShowOptions({ content }) {
  const parsedContent = JSON.parse(content);
  const [experience, setExperience] = useState(0);
  if (!Array.isArray(parsedContent) || parsedContent.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 gap-y-5">
      <section className="lg:flex lg:flex-col lg:justify-start md:flex md:flex-col md:justify-center lg:w-1/4 md:w-full lg:h-full md:flex-1 min-h-0 pb-5">
        {/* desk view*/}
        <RangerOptionSelector
          items={parsedContent}
          selectedIndex={experience}
          onSelect={setExperience}
          labelKey="company_name"
        />
        {/* mobile view*/}
        <RangerOptionSelectorMobileView
          currentIndex={experience}
          length={parsedContent.length}
          label={parsedContent[experience].company_name}
          onPrev={() => setExperience((prev) => prev - 1)}
          onNext={() => setExperience((prev) => prev + 1)}
        />
      </section>
      <section className="h-full lg:w-3/4">
        <RangerOptionContent content={content} experience={experience} />
      </section>
    </div>
  );
}
