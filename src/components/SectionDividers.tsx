export function OrganicDivider({ variant = 0, flip = false }: { variant?: number; flip?: boolean }) {
  const paths = [
    "M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,50 C1200,70 1320,40 1440,60 L1440,120 L0,120 Z",
    "M0,50 Q240,90 480,50 T960,60 Q1200,40 1440,55 L1440,120 L0,120 Z",
    "M0,70 C320,30 640,90 960,50 C1120,35 1280,75 1440,55 L1440,120 L0,120 Z",
  ];

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
        <path d={paths[variant % paths.length]} fill="hsl(var(--secondary) / 0.3)" />
        <path d={paths[(variant + 1) % paths.length]} fill="hsl(var(--secondary) / 0.5)" className="translate-y-[10px]" />
      </svg>
    </div>
  );
}

export function WaveDivider({ variant = "sage" }: { variant?: "sage" | "cream" }) {
  const fill = variant === "sage" ? "hsl(var(--secondary))" : "hsl(var(--background))";
  return (
    <div className="w-full overflow-hidden leading-[0]">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20">
        <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  );
}
