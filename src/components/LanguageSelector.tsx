import { Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const LanguageSelector = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/25 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 gap-1.5 h-9"
          aria-label={t("nav.language")}
        >
          <Languages className="h-4 w-4 text-primary" />
          {!compact && (
            <span className="text-xs font-medium uppercase tracking-wider">
              {current.code}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover/95 backdrop-blur-xl border-primary/20">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-primary/80">
          {t("nav.language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <DropdownMenuItem
              key={l.code}
              onSelect={() => setLang(l.code)}
              className={cn(
                "cursor-pointer flex items-center justify-between gap-3 focus:bg-primary/10",
                active && "text-primary",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-xs font-mono uppercase text-muted-foreground w-5">
                  {l.code}
                </span>
                <span className="text-sm">{l.native}</span>
              </span>
              {active && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
