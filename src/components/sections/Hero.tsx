import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { StarField } from "@/components/StarField";
import { INVITE_URL } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import heroMosque from "@/assets/hero-mosque.jpg";

export const Hero = () => {
  const { t } = useI18n();
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={heroMosque}
          alt=""
          width={1920}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />
      </div>

      <StarField count={90} />

      <div className="container relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-8 animate-fade-in-slow">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs uppercase tracking-[0.2em] text-primary/90">
            {t("hero.badge")}
          </span>
        </div>

        <h1
          className="font-serif font-semibold leading-[1.05] mb-6 animate-fade-in"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        >
          <span className="text-foreground">{t("hero.title1")}</span>
          <span className="block text-gradient-gold">{t("hero.title2")}</span>
        </h1>

        <p
          className="font-arabic text-2xl md:text-3xl text-primary/90 mb-5 animate-fade-in"
          style={{ animationDelay: "120ms" }}
          dir="rtl"
        >
          إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا
        </p>

        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in"
          style={{ animationDelay: "240ms" }}
        >
          {t("hero.desc")}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "360ms" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-gold text-primary-foreground hover:opacity-90 hover:glow-gold-strong font-medium h-12 px-8 text-base group"
          >
            <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">
              {t("hero.cta.add")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 text-foreground"
          >
            <a href="#features">{t("hero.cta.explore")}</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
