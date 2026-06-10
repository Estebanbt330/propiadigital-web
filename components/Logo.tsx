type LogoVariant = "navbar" | "hero";

export default function Logo({
  variant = "navbar",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const isHero = variant === "hero";
  const digitalColor = isHero ? "text-white" : "text-petrol";
  const propiaSize = isHero ? "text-4xl sm:text-6xl" : "text-xl sm:text-2xl";
  const digitalSize = isHero ? "text-base sm:text-xl" : "text-[9px] sm:text-[10px]";
  const digitalTracking = isHero ? "tracking-[0.5em]" : "tracking-[0.35em]";

  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
    >
      <span
        className={`font-display font-bold tracking-tight text-accent ${propiaSize}`}
      >
        PROPIA
      </span>
      <span
        className={`font-sans font-medium uppercase ${digitalTracking} ${digitalColor} ${digitalSize} ${
          isHero ? "mt-2 sm:mt-3" : "mt-0.5"
        }`}
      >
        DIGITAL
      </span>
    </span>
  );
}
