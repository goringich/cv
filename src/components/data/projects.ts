
import coverAlgo from "@/assets/images/Screenshot_20250924_131731.png";
import coverMcu from "@/assets/images/9c7cf859-a67a-4691-9cbd-a0467a8f8991.jpeg";
import coverTbank from "@/assets/images/main-page.jpg"; 

export const projects = [
  {
    title: "AlgoHack — визуализация алгоритмов",
    description:
      "Интерактивный движок визуализации алгоритмов (Fenwick, Segment Tree), шаги, подсветка кода, контроль скорости.",
    tags: ["React", "TypeScript", "React-Konva", "Redux Toolkit", "Vite"],
    cover: coverAlgo,
    links: { demo: "https://github.com/goringich/algohack", repo: "https://github.com/goringich/algohack" }
  },
  {
    title: "Yadro & Neimark — NMS для MCU",
    description:
      "Система мониторинга сети микроконтроллеров: регистрация устройств, телеметрия, топология, WebSocket/gRPC.",
    tags: ["React", "TypeScript", "Redux", "RTK Query", "PixiJS"],
    cover: coverMcu,
    links: { demo: "https://example.com/nms", repo: "https://github.com/goringich/yadronymarkwork" }
  },
  {
    title: "T-Bank — сервис подбора партнёров для обеда",
    description:
      "Веб-сервис для сотрудников, позволяющий находить партнёров для совместного обеда. Реализованы формы, маршрутизация, работа с состоянием и анимации.",
    tags: ["React", "TypeScript", "Redux Toolkit", "React Router", "UI/UX"],
    cover: coverTbank,
    links: { repo: "https://github.com/goringich/tbank-project" }
  }
];