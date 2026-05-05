import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export const QuoteSection = () => {
  const { ref, shown } = useReveal();
  const { t } = useI18n();
  const tagKeys = ["quote.tag.peace", "quote.tag.remembrance", "quote.tag.community"];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div ref={ref} className="container max-w-3xl text-center">
        <div className={cn(shown && "animate-scale-in")}>
          <Quote className="h-10 w-10 text-primary/60 mx-auto mb-8" strokeWidth={1.2} />

          <p className="font-arabic text-3xl md:text-4xl leading-loose text-foreground mb-6" dir="rtl">
            أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ
          </p>

          <p className="font-serif text-2xl md:text-3xl italic text-foreground/90 leading-relaxed mb-4">
            {t("quote.translation")}
          </p>
          <p className="text-sm text-primary/80 mb-10 tracking-wide">{t("quote.source")}</p>

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
            {t("quote.body")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {tagKeys.map((k) => (
              <span
                key={k}
                className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary/90"
              >
                {t(k)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
