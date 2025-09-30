import { User, Target, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const aboutMe = {
  title: "О себе",
  intro: `Я фронтенд-разработчик на React/TypeScript. Опыт: пет-проекты, хакатоны, фриланс (лендинги, мультистраничные сайты, мини-приложения),
стажировка 9 месяцев. Делал визуализации алгоритмов, интерфейсы для мониторинга систем, дашборды и UI-киты.
Интересуюсь архитектурой компьютера и низкоуровневыми системами — люблю разбираться, как всё устроено внутри.
Обожаю учиться и быстро погружаться в новые технологии. Кандидат в мастера спорта по карате, фанат задачек и головоломок.`,

  whyFrontend: [
    "Сочетание инженерии и дизайна: можно делать и удобное, и красивое.",
    "Мгновенная обратная связь и сильная экосистема (React, TypeScript, tooling).",
    "Типобезопасность и масштабируемость: архитектура, паттерны, дизайн-системы.",
  ],

  goals: [
    "Прокачивать фронтенд в сложных продуктах: производительность, анимации, визуализация данных.",
    "Работать с нетривиальными задачами: реальное время (WS/gRPC), большие состояния, сложные графы/канвас.",
    "Расширять full-stack-навыки: Go/Python, микросервисы, DevOps-инструменты.",
  ],
};


export function AboutMe() {
  return (
    <Card className="rounded-3xl card-neo">
      <CardContent className="p-6 space-y-6">
        {/* Интро */}
        <div className="flex items-center gap-3">
          <User className="h-5 w-5" />
          <div className="font-medium">Кто я</div>
        </div>
        <p className="text-sm opacity-90 leading-6 whitespace-pre-line">
          {aboutMe.intro}
        </p>

        {/* Почему фронтенд */}
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5" />
          <div className="font-medium">Почему фронтенд</div>
        </div>
        <ul className="grid gap-2">
          {aboutMe.whyFrontend.map((x, i) => (
            <li key={i} className="flex items-start gap-2 text-sm opacity-90">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
              {x}
            </li>
          ))}
        </ul>

        {/* Цели */}
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5" />
          <div className="font-medium">Цели развития</div>
        </div>
        <ul className="grid gap-2">
          {aboutMe.goals.map((x, i) => (
            <li key={i} className="flex items-start gap-2 text-sm opacity-90">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
              {x}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
