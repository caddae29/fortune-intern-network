import finLogoSrc from "../imports/WhatsApp_Image_2026-09-09_at_12.01.56_PM.jpeg";

interface LogoProps {
  variant?: "light" | "dark" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
}

const markSizes = {
  xs: "w-7 h-7",
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

const textSizes = {
  xs: { name: "text-xs", tagline: "text-[8px]" },
  sm: { name: "text-sm", tagline: "text-[9px]" },
  md: { name: "text-base", tagline: "text-[10px]" },
  lg: { name: "text-xl", tagline: "text-xs" },
  xl: { name: "text-2xl", tagline: "text-sm" },
};

export default function Logo({
  variant = "dark",
  size = "md",
  showWordmark = true,
  showTagline = false,
  className = "",
}: LogoProps) {
  const isOnDark = variant === "white" || variant === "light";
  const s = textSizes[size];
  const markSize = markSizes[size];

  return (
    <div className={`flex items-center gap-2.5 flex-shrink-0 ${className}`}>
      {/* Logo mark — always the real uploaded image */}
      <div
        className={`${markSize} rounded-xl overflow-hidden flex-shrink-0 ${
          isOnDark ? "bg-white p-0.5 shadow-sm" : "bg-white p-0.5"
        }`}
      >
        <img
          src={finLogoSrc}
          alt="Fortune Intern Network"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-extrabold tracking-tight leading-none ${s.name} ${
              isOnDark ? "text-white" : "text-fin-navy"
            }`}
          >
            FIN
          </span>
          {showTagline && (
            <span
              className={`font-medium tracking-wide leading-tight mt-0.5 ${s.tagline} ${
                isOnDark ? "text-white/65" : "text-fin-muted"
              }`}
            >
              Fortune Intern Network
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Full-width horizontal lockup — mark + full "FORTUNE INTERN NETWORK" wordmark */
export function LogoFull({
  size = "md",
  onDark = false,
}: {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}) {
  const heights = { sm: "h-10", md: "h-14", lg: "h-20" };
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div
        className={`${heights[size]} aspect-square rounded-xl overflow-hidden bg-white p-0.5 flex-shrink-0 shadow-sm`}
      >
        <img
          src={finLogoSrc}
          alt="Fortune Intern Network"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-wide ${
            size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl"
          } ${onDark ? "text-white" : "text-fin-navy"}`}
        >
          FORTUNE
        </span>
        <span
          className={`font-bold tracking-widest ${
            size === "sm"
              ? "text-[10px]"
              : size === "md"
                ? "text-xs"
                : "text-sm"
          } mt-0.5`}
        >
          <span className="text-fin-gold">INTERN</span>{" "}
          <span className={onDark ? "text-white/80" : "text-fin-navy/70"}>
            NETWORK
          </span>
        </span>
      </div>
    </div>
  );
}

/** Square mark-only — for favicons, avatars, tight spaces */
export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-white flex-shrink-0 ${className}`}
      style={{ width: size, height: size, padding: 2 }}
    >
      <img
        src={finLogoSrc}
        alt="FIN"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
}
