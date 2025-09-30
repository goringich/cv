import React from "react";
import { CircleDot } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { experience, type ExperienceDetails } from "./data/experience";
import { education } from "./data/education";

function Education() {
  return (
    <div className="grid gap-3">
      {education.map((ed) => (
        <Card key={ed.title} className="rounded-3xl card-neo">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <div className="font-medium">{ed.title}</div>
              <div className="text-sm opacity-70">{ed.period}</div>
            </div>
            <p className="text-sm opacity-90">{ed.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- как у тебя ---
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CircleDot className="h-4 w-4 mt-0.5 shrink-0" />
      <span className="text-sm leading-6 opacity-90">{children}</span>
    </li>
  );
}

function ProjectDescription({ details }: { details: ExperienceDetails }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
      {/* TOP: 3 секции + вертикальные разделители на всю высоту ряда */}
      <div
        className="
          grid items-stretch gap-0
          divide-y divide-white/10 md:divide-y-0
          md:grid-cols-[1fr_1px_1fr_1px_1fr]
        "
      >
        {/* 1) Технологии */}
        <div className="p-5">
          <div className="text-[11px] uppercase opacity-60 mb-2 tracking-wider">
            используемые технологии
          </div>
          <div className="flex flex-wrap gap-2">
            {details.tech.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Вертикальный разделитель (собственная колонка 1px) */}
        <div aria-hidden className="hidden md:block bg-white/10" />

        {/* 2) Роль */}
        <div className="p-5">
          <div className="text-[11px] uppercase opacity-60 mb-2 tracking-wider">
            роль в проекте
          </div>
          <p className="text-sm opacity-90 leading-6">{details.role}</p>
        </div>

        {/* Вертикальный разделитель */}
        <div aria-hidden className="hidden md:block bg-white/10" />

        {/* 3) Задачи / трудности */}
        <div className="p-5">
          <div className="text-[11px] uppercase opacity-60 mb-2 tracking-wider">
            решённые задачи и преодолённые трудности
          </div>
          <ul className="grid gap-2">
            {details.challenges.map((c, i) => (
              <li key={i} className="text-sm opacity-90 leading-6">— {c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM: зелёный блок */}
      {(details.learnings?.length || details.favorite) && (
        <div className="bg-emerald-500/10 border-t border-white/10 grid md:grid-cols-2">
          <div className="p-5">
            <div className="text-[11px] uppercase opacity-60 mb-2 tracking-wider">
              чему научился
            </div>
            <ul className="grid gap-2">
              {(details.learnings ?? []).map((l, i) => (
                <li key={i} className="text-sm opacity-90 leading-6">— {l}</li>
              ))}
              {!details.learnings?.length && (
                <li className="text-sm opacity-70">—</li>
              )}
            </ul>
          </div>

          <div className="p-5 md:border-l md:border-white/10">
            <div className="text-[11px] uppercase opacity-60 mb-2 tracking-wider">
              любимая часть проекта
            </div>
            <p className="text-sm opacity-90 leading-6">
              {details.favorite || "—"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


export function Experience() {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <Education />
      <div className="grid gap-3">
        {experience.map((e) => {
          const id = `${e.role}-${e.company}`;
          const isOpen = !!open[id];
          const hasDetails = (e as any).details;

        return (
          <Card key={id} className="rounded-3xl card-neo">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="font-medium">
                  {e.role} — {e.company}
                </div>
                <div className="text-sm opacity-70">{e.period}</div>
              </div>

              <ul className="grid gap-2 mb-3">
                {e.bullets.map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </ul>

              {/* Кнопка раскрывашки только если есть details */}
              {hasDetails && (
                <button
                  type="button"
                  onClick={() =>
                    setOpen((s) => ({ ...s, [id]: !s[id] }))
                  }
                  className="mt-1 inline-flex items-center gap-2 text-xs opacity-80 hover:opacity-100 transition"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isOpen ? "Скрыть описание проекта" : "Показать описание проекта"}
                </button>
              )}

              {/* Сам блок описания */}
              {isOpen && hasDetails && (
                <ProjectDescription details={(e as any).details} />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
    </div>
  );
}
