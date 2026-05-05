import { Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { INVITE_URL } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-primary/10 mt-20">
      <div className="container py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-primary/10">
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-lg font-semibold">Quran Radio</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-primary/80">{t("footer.navigate")}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#features" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.features")}</a></li>
            <li><a href="/#statistics" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.statistics")}</a></li>
            <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.dashboard")}</Link></li>
            <li><a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.invite")}</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-primary/80">{t("footer.reflection")}</h4>
          <p className="font-arabic text-lg text-foreground leading-loose" dir="rtl">
            وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ
          </p>
          <p className="text-xs text-muted-foreground italic">{t("footer.reflectionEn")}</p>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Quran Radio. {t("footer.copyright")}</p>
          <p>{t("footer.ummah")}</p>
        </div>
      </div>
    </footer>
  );
};
