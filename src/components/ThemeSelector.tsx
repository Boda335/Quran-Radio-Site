import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES, useTheme } from "@/lib/themes";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/25 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 h-9 w-9 p-0"
          aria-label={t("nav.theme")}
        >
          <Palette className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover/95 backdrop-blur-xl border-primary/20">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-primary/80">
          {t("nav.theme")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        {THEMES.map((th) => {
          const active = th.id === theme;
          return (
            <DropdownMenuItem
              key={th.id}
              onSelect={() => setTheme(th.id)}
              className={cn(
                "cursor-pointer flex items-center justify-between gap-3 focus:bg-primary/10",
                active && "text-primary",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-4 w-4 rounded-full bg-gradient-to-br ring-1 ring-white/10",
                    th.swatch,
                  )}
                />
                <span className="text-sm">{th.name}</span>
              </span>
              {active && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
