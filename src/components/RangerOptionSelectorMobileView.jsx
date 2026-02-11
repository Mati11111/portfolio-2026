import LeftIcon from "@/assets/left-icon.svg?url";
import LeftIconDark from "@/assets/left-icon-dark-mode.svg?url";

export default function RangerOptionSelectorMobileView({
  currentIndex,
  length,
  label,
  onPrev,
  onNext,
}) {
  return (
    <section className="lg:hidden flex flex-row justify-between w-full select-none">
      <button disabled={currentIndex === 0} onClick={onPrev}>
        <img
          src={LeftIcon}
          alt="Previous"
          className={`w-6 h-6 transition-all duration-300 ease-in-out dark:hidden
          ${currentIndex === 0 ? "cursor-default opacity-30" : "cursor-pointer"}`}
        />
        <img
          src={LeftIconDark}
          alt="Previous"
          className={`w-6 h-6 transition-all duration-300 ease-in-out hidden dark:block
          ${currentIndex === 0 ? "cursor-default opacity-30" : "cursor-pointer"}`}
        />
      </button>

      <span
        className="xl:text-[1.3rem] md:text-sm text-nowrap h-fit overflow-visible text-ellipsis
        font-medium border p-1 bg-bg-secondary border-bg-secondary text-text-secondary"
      >
        {label}
      </span>

      <button disabled={currentIndex === length - 1} onClick={onNext}>
        <img
          src={LeftIcon}
          alt="Next"
          className={`w-6 h-6 transition-all duration-300 rotate-180 ease-in-out dark:hidden
          ${currentIndex === length - 1 ? "cursor-default opacity-30" : "cursor-pointer"}`}
        />
        <img
          src={LeftIconDark}
          alt="Next"
          className={`w-6 h-6 transition-all duration-300 rotate-180 ease-in-out hidden dark:block
          ${currentIndex === length - 1 ? "cursor-default opacity-30" : "cursor-pointer"}`}
        />
      </button>
    </section>
  );
}
