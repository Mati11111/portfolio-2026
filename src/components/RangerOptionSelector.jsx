export default function RangerOptionSelector({
  items,
  selectedIndex,
  onSelect,
  labelKey = "company_name",
}) {
  return (
    <ul className="hidden lg:block">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onSelect(index)}
          className={`xl:text-[1.3rem] md:text-sm text-nowrap overflow-hidden text-ellipsis cursor-pointer font-medium border pl-1 select-none
            ${
              index === selectedIndex
                ? "bg-variant text-bg-secondary border-variant"
                : "bg-bg-secondary border border-bg-secondary text-text-secondary"
            }`}
        >
          {item[labelKey]}
        </li>
      ))}
    </ul>
  );
}
