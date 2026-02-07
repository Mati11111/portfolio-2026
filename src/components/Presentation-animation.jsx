import { useState } from "react";

export default function PresentationAnimation() {
  const [step, setStep] = useState(0);

  return (
    <section className="text-text-presentation relative h-screen grid place-items-center w-full">
      {step === 0 && (
        <div
          className="text-huge absolute z-10 text-tex text-nowrap animate-blinking translate-x-start"
          onAnimationEnd={() => setStep(1)}
        >
          <p>&gt;</p>
        </div>
      )}

      {step === 1 && (
        <div
          className={`text-huge absolute z-20 bg-transparent text-secondary text-nowrap animate-translateX translate-x-start
          ${step > 1 ? "" : "opacity-0"}`}
        >
          <p>&gt;</p>
        </div>
      )}

      {step == 1 && (
        <div className="text-nowrap absolute z-30 flex justify-center items-center reveal-left gap-4 text-secondary">
          <h1
            id="presentation-card"
            className="text-huge tracking-huge inline-block"
          >
            MATI
          </h1>
          <p className="text-huge inline-block">&lt;/&gt;</p>
        </div>
      )}
    </section>
  );
}
