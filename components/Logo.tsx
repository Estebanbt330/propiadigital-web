type LogoVariant = "navbar" | "hero";

export default function Logo({
  variant = "navbar",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const digitalColor = variant === "hero" ? "text-white" : "text-petrol";
  const propiaSize =
    variant === "hero" ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl";
  const digitalSize =
    variant === "hero" ? "text-sm sm:text-base" : "text-[9px] sm:text-[10px]";

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
        className={`font-sans font-medium uppercase tracking-[0.35em] ${digitalColor} ${digitalSize} ${
          variant === "hero" ? "mt-1" : "mt-0.5"
        }`}
      >
        DIGITAL
      </span>
    </span>
  );
}
