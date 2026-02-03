import { useState } from "react";

export default function RangerLeftContainer({ content }) {
  const [option, setOption] = useState(0);

  return (
    <section className="w-full h-full">
      <ul>
        <li onClick={() => setOption(0)}>here: {content}</li>
        <li onClick={() => setOption(1)}>{content}</li>
        <li>{content}</li>
      </ul>
    </section>
  );
}

export function RangerMiddleContainer() {
  const [option, setOption] = useState(0);

  return (
    <section className="w-full h-full">
      <ul>
        <li>{"1"}</li>
        <li>{"2"}</li>
        <li>{"3"}</li>
      </ul>
    </section>
  );
}

export function RangerRightContainer() {
  const [option, setOption] = useState(0);

  return (
    <section className="w-full h-full">
      <ul>
        <li>{"1"}</li>
        <li>{"2"}</li>
        <li>{"3"}</li>
      </ul>
    </section>
  );
}
