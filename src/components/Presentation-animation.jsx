import { useState } from "react";

export default function PresentationAnimation() {
  const [step, setStep] = useState(0);

  return (
    <section className="relative h-screen grid place-items-center">
      {step === 0 && (
        <div
          className="absolute z-10 text-huge text-secondary text-nowrap animate-blinking -translate-x-210"
          onAnimationEnd={() => setStep(1)}
        >
          <p>&gt;</p>
        </div>
      )}

      {step === 1 && (
        <div
          className={`absolute z-20 bg-transparent text-huge text-secondary text-nowrap animate-translateX -translate-x-210
          ${step > 1 ? "" : "opacity-0"}`}
        >
          <p>&gt;</p>
        </div>
      )}

      {step == 1 && (
        <div className="text-nowrap absolute z-30 flex justify-center items-center reveal-left gap-4 text-huge text-secondary">
          <h1
            id="presentation-card"
            className="tracking-huge text-huge text-secondary inline-block "
          >
            MATI
          </h1>
          <p className="inline-block ">&lt;/&gt;</p>
        </div>
      )}
    </section>
  );
}
