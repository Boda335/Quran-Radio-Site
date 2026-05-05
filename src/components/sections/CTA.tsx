import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { INVITE_URL } from "@/lib/config";
import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const CTA = () => {
  const { ref, shown } = useReveal();
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container">
        <div
          className={cn(
            "surface-card border-gold-strong relative overflow-hidden rounded-3xl px-8 py-16 md:py-20 text-center max-w-4xl mx-auto",
            shown && "animate-scale-in",
          )}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/30 px-4 py-1.5 mb-6">
              <Heart className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary/90">{t("cta.badge")}</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-5 leading-tight">
              {t("cta.title1")}<br />
              <span className="text-gradient-gold">{t("cta.title2")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">{t("cta.desc")}</p>

            <Button
              asChild
              size="lg"
              className="bg-gradient-gold text-primary-foreground hover:opacity-90 hover:glow-gold-strong font-medium h-14 px-10 text-base group"
            >
              <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">
                {t("cta.button")}
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
