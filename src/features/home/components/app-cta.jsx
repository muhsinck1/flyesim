import { Apple, PlayCircle } from "lucide-react";
import home from "@/content/home.json";

export function AppCta() {
  const { appCta: a } = home;
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-card border border-border bg-muted p-10 text-center md:p-14">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">{a.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{a.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-lg bg-foreground px-5 py-3 text-background">
            <Apple className="h-6 w-6 shrink-0" aria-hidden />
            <span className="text-sm font-semibold">App Store</span>
          </span>
          <span className="inline-flex items-center gap-2.5 rounded-lg bg-foreground px-5 py-3 text-background">
            <PlayCircle className="h-6 w-6 shrink-0" aria-hidden />
            <span className="text-sm font-semibold">Google Play</span>
          </span>
        </div>
      </div>
    </section>
  );
}
