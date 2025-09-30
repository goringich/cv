// --- Project Types (summary) ---
type ProjectTypeKey =
  | "software"
  | "databases"
  | "ml"
  | "devops"
  | "security"
  | "web"
  | "mobile"
  | "oss";

export const projectTypes: Record<
  ProjectTypeKey,
  { title: string; color: string; items: string[] }
> = {
    web: {
    title: "Проекты веб-разработки (остальные)",
    color: "from-sky-400/30 to-sky-300/20",
    items: [
      "T-Lunches — приложение для совместных обедов сотрудников т-банка",
      "Dashboard for AI Bot — проект с хакатона Сбера с визуализацей метрик работы AI-бота",
      "Frontend Sorcery — CSS-эксперименты",
      "Megaton — тг-приложение с майнингом криптовалюты, аналог \"хомяка\"",
      "Finance tg-application— тг-приложение для учёта финансов",
      "Zydex — рекламный сайт IT-компании (пет-проект)",
      "Множество других небольших проектов, лендингов и SPA, включая коммерческие",
    ],
  },
  software: {
    title: "Разработка программного обеспечения",
    color: "from-emerald-400/30 to-emerald-300/20",
    items: [
      "Elevator Simulator — симуляция лифта на потоках",
      "RCP Fetcher — утилита для обработки IP-данных",
      "Matrix Toolbox — операции с комплексными матрицами",
      "Disk-Space Manager — скрипт для управления дисковым пространством",
    ],
  },
  databases: {
    title: "Проекты баз данных",
    color: "from-amber-400/30 to-amber-300/20",
    items: [
      "DB Utilities — CRUD, SQL, PostgreSQL-менеджеры",
      "User Info Manager — работа с пользовательскими данными",
    ],
  },
  ml: {
    title: "Машинное обучение и анализ данных",
    color: "from-fuchsia-400/30 to-fuchsia-300/20",
    items: [
      "Finance Tracker Bot — учёт расходов и визуализация",
      "Algorithmic Web Course — визуализация алгоритмов",
      "Parallel Graphics — проекты по графике",
    ],
  },
  oss: {
    title: "Остальное",
    color: "from-green-400/30 to-green-300/20",
    items: [
      "GPU Whisperer — инструмент на Faster-Whisper",
      "Game of Life ++ — игра «Жизнь» в консоли",
    ],
  },
  devops: {
    title: "",
    color: "",
    items: []
  },
  security: {
    title: "",
    color: "",
    items: []
  },
  mobile: {
    title: "",
    color: "",
    items: []
  }
};
