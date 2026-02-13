export function BlobDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path
          d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1200,90 1320,30 1440,60 L1440,120 L0,120 Z"
          fill="hsl(var(--secondary))"
        />
      </svg>
    </div>
  );
}

export function WaveDivider({ variant = "sage" }: { variant?: "sage" | "cream" }) {
  const fill = variant === "sage" ? "hsl(var(--secondary))" : "hsl(var(--background))";
  return (
    <div className="w-full overflow-hidden leading-[0]">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20">
        <path
          d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
