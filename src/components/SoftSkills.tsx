import { Card, CardContent } from "@/components/ui/card";

const softSkills = [
  "Командная работа (коллаборация через Jira, Git, Code Review)",
  "Навыки коммуникации (обсуждение архитектуры, презентация решений)",
  "Адаптивность к новым задачам и технологиям",
  "Самоорганизация и тайм-менеджмент",
  "Настойчивость в отладке и доведении задач до результата",
  "Креативность в UI/UX и подходах к разработке",
];

export function SoftSkills() {
  return (
    <div className="grid gap-3">
      <Card className="rounded-3xl card-neo">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="font-medium">Soft Skills</div>
          </div>
          <ul className="grid gap-2">
            {softSkills.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm opacity-90">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                {s}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}