"use client";

/** Decorative HVAC-inspired motion (CSS-only). Wrapper hidden when `motion-reduce` — see globals.css */

const heroParticles = [
  { left: "6%", dur: 12.5, delay: 0, w: 7 },
  { left: "18%", dur: 14.2, delay: 2.1, w: 5 },
  { left: "34%", dur: 11.8, delay: 4.4, w: 9 },
  { left: "52%", dur: 13.6, delay: 1.2, w: 6 },
  { left: "71%", dur: 15.1, delay: 3.8, w: 8 },
  { left: "88%", dur: 12.9, delay: 5.5, w: 5 },
  { left: "42%", dur: 16.4, delay: 7.2, w: 6 },
];

const sectionParticles = [
  { left: "4%", dur: 13.2, delay: 0, w: 8 },
  { left: "14%", dur: 14.8, delay: 1.4, w: 6 },
  { left: "26%", dur: 12.1, delay: 3.1, w: 10 },
  { left: "38%", dur: 15.6, delay: 0.8, w: 7 },
  { left: "51%", dur: 13.9, delay: 4.9, w: 9 },
  { left: "63%", dur: 14.5, delay: 2.6, w: 6 },
  { left: "76%", dur: 16.2, delay: 5.3, w: 8 },
  { left: "89%", dur: 13.4, delay: 6.7, w: 7 },
  { left: "95%", dur: 15.9, delay: 3.3, w: 5 },
  { left: "21%", dur: 17.1, delay: 8.4, w: 6 },
];

export function ClimateHeroBreath() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[8] overflow-hidden motion-reduce:hidden max-lg:opacity-70"
      aria-hidden
    >
      <div className="hvac-airflow-layer hvac-airflow-layer--hero absolute -inset-[25%]" />
      <svg
        className="hvac-flow-lines absolute inset-x-[-10%] bottom-[-5%] h-[42%] text-brand-blue-light/35"
        viewBox="0 0 1200 180"
        preserveAspectRatio="none"
      >
        <path
          className="hvac-dash-flow fill-none stroke-current"
          strokeWidth="1.15"
          strokeLinecap="round"
          d="M0 140 Q200 90 400 110 T800 95 T1200 105"
        />
        <path
          className="hvac-dash-flow fill-none stroke-current opacity-60"
          style={{ animationDelay: "-4s" }}
          strokeWidth="0.85"
          strokeLinecap="round"
          d="M0 165 Q280 120 520 138 T920 118 T1200 130"
        />
      </svg>
      <div className="absolute inset-0">
        {heroParticles.map((p, i) => (
          <span
            key={i}
            className="hvac-particle absolute rounded-full bg-gradient-to-t from-brand-blue-light/35 to-brand-white/15 blur-[3px]"
            style={{
              left: p.left,
              bottom: "-4%",
              width: p.w,
              height: p.w * 1.65,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ClimateSectionMotion({ intensity = "normal" }: { intensity?: "normal" | "light" }) {
  const airflowClass =
    intensity === "light"
      ? "hvac-airflow-layer hvac-airflow-layer--section absolute -inset-[18%] opacity-[0.55]"
      : "hvac-airflow-layer hvac-airflow-layer--section absolute -inset-[22%] opacity-[0.72]";

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden motion-reduce:hidden" aria-hidden>
      <div className={airflowClass} />
      <div className="absolute inset-0">
        {sectionParticles.map((p, i) => (
          <span
            key={i}
            className="hvac-particle absolute rounded-full bg-gradient-to-t from-brand-silver/40 to-brand-white/12 blur-[2.5px]"
            style={{
              left: p.left,
              bottom: "-6%",
              width: p.w,
              height: p.w * 1.55,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
