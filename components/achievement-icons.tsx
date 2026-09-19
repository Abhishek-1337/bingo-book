import { Award, Crown, Flame, Lightbulb, Medal, Rocket, Sparkles, Star, Target, Trophy, type LucideIcon } from "lucide-react";

export type AchievementIconName =
  | "trophy"
  | "medal"
  | "award"
  | "target"
  | "star"
  | "rocket"
  | "lightbulb"
  | "flame"
  | "sparkles"
  | "crown";

export const achievementIconOptions: { value: AchievementIconName; label: string; Icon: LucideIcon }[] = [
  { value: "trophy", label: "Trophy", Icon: Trophy },
  { value: "medal", label: "Medal", Icon: Medal },
  { value: "award", label: "Award", Icon: Award },
  { value: "target", label: "Target", Icon: Target },
  { value: "star", label: "Star", Icon: Star },
  { value: "rocket", label: "Rocket", Icon: Rocket },
  { value: "lightbulb", label: "Idea", Icon: Lightbulb },
  { value: "flame", label: "Flame", Icon: Flame },
  { value: "sparkles", label: "Sparkles", Icon: Sparkles },
  { value: "crown", label: "Crown", Icon: Crown },
];

// Stored values predate lucide (emoji strings). Unknown values fall back to Trophy.
export function AchievementIcon({ name, className }: { name?: string | null; className?: string }) {
  const found = achievementIconOptions.find((o) => o.value === name);
  const Icon = found ? found.Icon : Trophy;
  return <Icon className={className} aria-hidden="true" />;
}
