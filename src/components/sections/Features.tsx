import { Radio, Sun, Clock, LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FeatureDef {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const features: FeatureDef[] = [
  { icon: Radio, titleKey: "feature.radio.title", descKey: "feature.radio.desc" },
  { icon: Sun,   titleKey: "feature.azkar.title", descKey: "feature.azkar.desc" },
  { icon: Clock, titleKey: "feature.prayer.title", descKey: "feature.prayer.desc" },
];

export const Features = () => {
  const { ref, shown } = useReveal();
  const { t } = useI18n();

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_60%)]" />

      <div ref={ref} className="container">
        <div className={cn("text-center max-w-2xl mx-auto mb-16", shown && "animate-fade-in")}>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{t("features.eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-5 leading-tight">
            {t("features.title1")}<br />
            <span className="text-gradient-gold">{t("features.title2")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t("features.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.titleKey}
              className={cn(
                "surface-card rounded-2xl p-8 hover-glow group",
                shown && "animate-fade-in",
              )}
              style={shown ? { animationDelay: `${i * 120}ms` } : undefined}
            >
              <div className="relative inline-flex mb-6">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] group-hover:scale-110 transition-transform duration-500">
                  <f.icon className="h-6 w-6" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">{t(f.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t(f.descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
