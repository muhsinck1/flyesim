import { cn } from "@/lib/cn";

export function CountryFlag({ country, className }) {
  if (!country?.flagEmoji) return null;

  return (
    <span
      role="img"
      aria-label={country.name ? `${country.name} flag` : "country flag"}
      className={cn("leading-none", className)}
    >
      {country.flagEmoji}
    </span>
  );
}
