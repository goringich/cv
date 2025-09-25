import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Code2,
  Rocket,
  Briefcase,
  GraduationCap,
  CircleDot,
  Hammer,
  Figma,
  Cpu,
  Boxes,
  Star,
  MessageCircle,
  Globe2,
  FileDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ExportPDFButton from "@/components/ExportPDFButton"

// design-first, single-file portfolio with premium visuals + print export
// fixed: stray CSS after </style> caused "Missing semicolon"; cleaned and tightened StyleBlock
// includes lightweight self-tests in dev to catch regressions

const projects = [
  {
    title: "AlgoHack — визуализация алгоритмов",
    description:
      "Интерактивный движок визуализации алгоритмов (Fenwick, Segment Tree), шаги, подсветка кода, контроль скорости.",
    tags: ["React", "TypeScript", "React‑Konva", "Redux Toolkit", "Vite"],
    cover: "../public/images/Screenshot_20250924_131731.png",
    links: {
      demo: "https://github.com/goringich/algohack",
      repo: "https://github.com/goringich/algohack"
    }
  },
  {
    title: "YadroNeimark — NMS для MCU",
    description:
      "Система мониторинга сети микроконтроллеров: регистрация устройств, телеметрия, топология, WebSocket/gRPC.",
    tags: ["React", "TypeScript", "Redux", "React Query", "PixiJS"],
    cover: "../public/images/9c7cf859-a67a-4691-9cbd-a0467a8f8991.jpeg",
    links: {
      demo: "https://example.com/nms",
      repo: "https://github.com/goringich/yadronymarkwork"
    }
  },
  {
  title: "T-Bank — сервис подбора партнёров для обеда",
  description:
    "Веб-сервис для сотрудников, позволяющий находить партнёров для совместного обеда. Реализованы формы, маршрутизация, работа с состоянием и анимации.",
  tags: ["React", "TypeScript", "Redux Toolkit", "React Router", "UI/UX"],
  cover: "../public/images/main page.jpg",
  links: {
    repo: "https://github.com/goringich/tbank-project"
  }
}

];

const skills = {
  core: [
    "TypeScript", "React", "Vite", "Redux Toolkit", "React Router", "React Query", "Axios",
    "HTML5", "CSS/SCSS", "WebSocket", "gRPC", "WASM (Emscripten)"
  ],
  ui: ["Tailwind", "SCSS Modules", "MUI", "Framer Motion", "react-hook-form", "react-table"],
  vis: ["PixiJS/@pixi/react", "React‑Konva", "Recharts", "d3.js"],
  tooling: ["ESLint", "Prettier", "Vitest/RTL", "Cypress", "MSW", "Storybook", "Webpack", "Gulp"],
  // backend: ["Go (Gin/Echo)", "Python (Flask)", "PostgreSQL", "Node.js", "PHP", "C/C++", "MATLAB"],
};

const experience = [
  {
    role: "Technical Lead & Full‑stack Developer",
    company: "Interactive Web Course (Algo visualization engine)",
    period: "7 месяцев",
    bullets: [
      "Вёл разработку интерактивного курса по алгоритмам: визуализатор структур данных (Fenwick, Segment Tree) и движок анимаций",
      "Архитектура: фронт (React, React‑Konva) + бэк (Go, Redis, PostgreSQL)",
      "Оптимизация производительности и плавности UI/UX"
    ]
  },
  {
    role: "Frontend Developer",
    company: "T‑Bank (академический проект)",
    period: "5 месяцев",
    bullets: [
      "Сервис подбора партнёров для обеда: продуманный UI/UX и перформанс",
      "Работа с формами, маршрутизацией, состоянием и анимациями",
      "Код‑ревью, дизайн‑система и гайд по компонентам"
    ]
  },
  {
    role: "Frontend Intern (React)",
    company: "Yadro & Neymark — NMS для сети микроконтроллеров",
    period: "9 месяцев",
    bullets: [
      "Разработал фронтенд топологии и статусов MCU: телеметрия, графы, таблицы, дашборды, динамические графики, алярмы",
      "Транспорт: REST API/WebSocket; кеширование через React Query; визуализация на PixiJS",
      "Документация API (Confluence), CI"
    ]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Проектная работа",
    period: "4 месяца",
    bullets: [
      "Лэндинги и мульти‑страничники: адаптив, кросс‑браузерность, SEO",
      "Телеграм‑веб‑приложения и мини‑аппы: боты, API, улучшенный UI",
      "Поддержка и развитие компонентов дизайна"
    ]
  }
];

const education = [
  {
    title: "НИУ ВШЭ — ФКН, Программная инженерия",
    period: "Поступил 2023 • Выпуск 2027",
    details: "Алгоритмы, структуры данных, сетевые протоколы, ООП в JS/TS, Go"
  }
];

const contacts = {
  name: "Igor Kim",
  role: "Frontend Developer (React/TypeScript)",
  city: "Nizniy Novgorod, RU",
  email: "",
  phone: "",
  github: "https://github.com/goringich",
  linkedin: "",
  telegram: "https://t.me/a1gorithms",
  vk: "https://vk.com/gogotka",
};

// --- dev self-tests ("test cases") ---
function runSelfTests() {
  try {
    const ok: string[] = [];
    const fail: string[] = [];

    const urlish = (s?: string) => !s || /^https?:\/\//.test(s) || s.startsWith("/");

    // contacts tests
    if (contacts.name && contacts.github) ok.push("contacts: required fields present"); else fail.push("contacts: name/github missing");
    if ([contacts.github, contacts.linkedin, contacts.telegram, contacts.vk].every(urlish)) ok.push("contacts: links look valid"); else fail.push("contacts: bad link format");

    // projects tests
    if (Array.isArray(projects) && projects.length >= 3) ok.push("projects: list length >= 3"); else fail.push("projects: not enough items");
    projects.forEach((p, i) => {
      if (!(p.title && p.description && Array.isArray(p.tags) && p.tags.length)) fail.push(`projects[${i}] shape invalid`);
      if (!urlish(p.cover) || !urlish(p.links.demo) || !urlish(p.links.repo)) fail.push(`projects[${i}] link/cover invalid`);
    });

    // experience tests
    experience.forEach((e, i) => {
      if (!(e.role && e.company && e.bullets && e.bullets.length)) fail.push(`experience[${i}] missing fields`);
    });

    // component presence tests
    if (typeof Portfolio === "function" && typeof Hero === "function") ok.push("components: main present"); else fail.push("components: missing Portfolio/Hero");

    // summary
    if (ok.length) console.log("[portfolio:self-tests] ✅", ok);
    if (fail.length) console.warn("[portfolio:self-tests] ⚠️", fail);
  } catch (err) {
    console.error("[portfolio:self-tests] error", err);
  }
}
if (typeof window !== "undefined" && (import.meta as any)?.env?.DEV) runSelfTests();

// ---- UI helpers ----
function useSpotlight() {
  // performance‑friendly: static gradient without mouse tracking
  const ref = useRef<HTMLDivElement | null>(null);
  const bg = "radial-gradient(500px circle at 20% 20%, rgba(77,130,255,0.12), transparent 60%)";
  return { ref, bg };
}

function triggerPrint(mode: 'cv' | 'full' = 'cv') {
  const prev = document.body.getAttribute('data-print');
  document.body.setAttribute('data-print', mode);

  const cleanup = () => {
    if (prev) document.body.setAttribute('data-print', prev);
    else document.body.removeAttribute('data-print');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);

  window.print();
}

function NavBar() {
  return (
    <div className="fixed top-4 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center justify-between bg-white/5 shadow-[0_0_1px_1px_rgba(255,255,255,.04)]">
          <a href="#home" className="text-sm font-medium tracking-wide opacity-90 ml-5">{contacts.name}</a>
          <div className="hidden sm:flex items-center gap-2">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>

            {/* две отдельные кнопки печати */}


            {/*<ExportPDFButton /> */}
            <Button asChild size="l" className="ml-2">
              <a
                href="../public/images/screen.pdf"
                download
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                <span>Export PDF</span>
              </a>
            </Button>


          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500/30 to-cyan-400/20 flex items-center justify-center border border-white/15">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </div>
    </div>
  );
}

function ProjectCard({ p, idx }: { p: (typeof projects)[number]; idx: number }) {
  return (
    <motion.a
      href={p.links.demo || p.links.repo}
      target="_blank"
      rel="noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.05 * idx }}
      data-test-id={`project-${idx}`}
    >
      <div className="project-card rounded-3xl overflow-hidden border border-white/10 backdrop-blur-x">
        <div className="relative aspect-[16/8] bg-black">
          <img
            src={p.cover}
            alt="cover"
            className="h-full w-full object-contain object-top scale-105 transition-transform duration-500 group-hover:scale-110 pt-1"

          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-tight tracking-tight">{p.title}</h3>
            <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
          </div>
          <p className="text-sm opacity-80 mt-2">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {p.tags.map(t => (
              <Badge key={t} variant="secondary" className="rounded-full backdrop-blur-sm">{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}


function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CircleDot className="h-4 w-4 mt-0.5 shrink-0" />
      <span className="text-sm leading-6 opacity-90">{children}</span>
    </li>
  );
}

function ContactForm() {
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget as HTMLFormElement);
        const payload = Object.fromEntries(data.entries());
        console.log("contact form:", payload);
        alert("Thanks! I will get back to you shortly.");
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Your name" required />
        <Input name="email" placeholder="Email" type="email" required />
      </div>
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" placeholder="Message" className="min-h-32" required />
      <Button type="submit" className="w-fit" data-test-id="contact-submit">
        <SendIcon /> Send
      </Button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  const { ref, bg } = useSpotlight();
  const floatY = useMotionValue(0);
  const translate = useTransform(floatY, [0, 1], [0, -6]);

  useEffect(() => {
    let t = 0; let raf = 0 as number | undefined as any;
    const loop = () => {
      t += 0.014;
      floatY.set((Math.sin(t) + 1) / 2);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf as number);
  }, [floatY]);

  return (
    <div ref={ref} className="relative grid lg:grid-cols-2 gap-8 items-center">
      <motion.div style={{ background: bg }} className="pointer-events-none absolute -inset-8" />

      <div>
        <div className="flex items-center gap-2 text-sm opacity-80 mb-3">
          <MapPin className="h-4 w-4" /> {contacts.city}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3 tracking-tight">
          <span className="glow">{contacts.name}</span>
        </h1>
        <p className="text-lg opacity-90 mb-6">{contacts.role}</p>
        <div className="flex flex-wrap gap-2 mb-7">
          <Button asChild className="btn-primary">
            <a href="#projects">
              <Rocket className="h-4 w-4 mr-2" /> Projects
            </a>
          </Button>
          <Button asChild variant="outline" className="btn-ghost">
            <a href="#contact">
              <Mail className="h-4 w-4 mr-2" /> Contact
            </a>
          </Button>
          <Button asChild variant="secondary" className="btn-glass">
            <a href="/cv.pdf" download>
              <Download className="h-4 w-4 mr-2" /> CV
            </a>
          </Button>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <a className="link" href={contacts.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> Github
            </a>
          </li>
          {contacts.linkedin && (
            <li>
              <a className="link" href={contacts.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
          )}
          {contacts.telegram && (
            <li>
              <a className="link" href={contacts.telegram} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> Telegram
              </a>
            </li>
          )}
          {contacts.vk && (
            <li>
              <a className="link" href={contacts.vk} target="_blank" rel="noreferrer">
                <Globe2 className="h-4 w-4" /> VK
              </a>
            </li>
          )}
          {contacts.phone && (
            <li className="opacity-90 inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> {contacts.phone}
            </li>
          )}
        </ul>
      </div>

      <motion.div style={{ y: translate }} className="grid grid-cols-2 gap-3 mt-10">
        <Card className="rounded-3xl card-neo col-span-2 pt-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="h-5 w-5" />
              <div className="font-medium">Frontend stack</div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm opacity-80">
              {skills.core.slice(0, 7).map(s => (
                <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl card-neo pt-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Hammer className="h-5 w-5" />
              <div className="font-medium">Tooling</div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm opacity-80">
              {skills.tooling.slice(0, 5).map(s => (
                <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl card-neo pt-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Boxes className="h-5 w-5" />
              <div className="font-medium">UI/Vis</div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm opacity-80">
              {[...skills.ui.slice(0, 2), ...skills.vis.slice(0, 2)].map(s => (
                <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function Skills() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {Object.entries(skills).map(([group, items]) => (
        <Card key={group} className="rounded-3xl card-neo">
          <CardHeader className="pb-2"><CardTitle className="text-base capitalize">{group}</CardTitle></CardHeader>
          <CardContent className="pt-0 flex flex-wrap gap-2">
            {(items as string[]).map(s => <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <div className="grid gap-3">
      {experience.map((e) => (
        <Card key={e.role} className="rounded-3xl card-neo pt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="font-medium">{e.role} — {e.company}</div>
              <div className="text-sm opacity-70">{e.period}</div>
            </div>
            <ul className="grid gap-2">
              {e.bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div className="grid gap-3">
      {education.map((ed) => (
        <Card key={ed.title} className="rounded-3xl card-neo pt-6">
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

function Projects() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} p={p} idx={i} />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-xs opacity-70 py-8 text-center">
      © {new Date().getFullYear()} {contacts.name}. Built with React + shadcn/ui.
    </footer>
  );
}

function useTailwindHealthcheck() {
  const ok = React.useMemo(() => {
    if (typeof window === 'undefined') return true;
    const el = document.createElement('div');
    el.className = 'hidden'; // tailwind should set display:none
    document.body.appendChild(el);
    const display = getComputedStyle(el).display;
    el.remove();
    return display === 'none';
  }, []);
  return ok;
}

export default function Portfolio() {
  const tailwindOk = useTailwindHealthcheck();
  return (
    <div id="home" className="min-h-screen text-base antialiased">
      {!tailwindOk && (
        <div className="fixed top-0 inset-x-0 z-[100]">
          <div style={{ background: '#2a0f0f', color: '#ffd8d8' }} className="px-4 py-3 text-sm">
            <b>Tailwind не активен.</b> Убедись, что:
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>В <code>tailwind.config.js</code> есть <code>content: ["./index.html", "./src/**/*.&#123;js,ts,jsx,tsx&#125;"]</code>.</li>
              <li>В <code>src/index.css</code> присутствуют директивы <code>@tailwind base; @tailwind components; @tailwind utilities;</code> и файл импортирован в <code>src/main.tsx</code>.</li>
              <li>Dev-сервер перезапущен после изменений (<code>npm run dev</code>).</li>
            </ol>
          </div>
        </div>
      )}
      <Background />
      <NavBar />
      <main className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-24">
        <Hero />

        <section id="projects" className="mt-16 section">
          <SectionHeader icon={Briefcase} title="Projects" subtitle="Отобранные работы" />
          <Projects />
        </section>

        <section id="skills" className="mt-16 section">
          <SectionHeader icon={Cpu} title="Skills" subtitle="Технологии продакшн‑уровня" />
          <Skills />
        </section>

        <section id="experience" className="mt-16 section">
          <SectionHeader icon={GraduationCap} title="Experience & Education" subtitle="Опыт и обучение" />
          <div className="grid lg:grid-cols-2 gap-3">
            <Experience />
            <Education />
          </div>
        </section>

        <section id="contact" className="mt-16 section">
          <SectionHeader icon={Mail} title="Contact" subtitle="Свяжитесь со мной" />
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-3xl card-neo pt-6">
              <CardContent className="p-6">
                <div className="grid gap-2 text-sm opacity-90 mb-4">
                  {contacts.email && (<div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {contacts.email}</div>)}
                  {contacts.phone && (<div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {contacts.phone}</div>)}
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {contacts.city}</div>
                  <div className="flex items-center gap-2"><Github className="h-4 w-4" /> {contacts.github}</div>
                  {contacts.telegram && (<div className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {contacts.telegram}</div>)}
                  {contacts.vk && (<div className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> {contacts.vk}</div>)}
                </div>
                <ContactForm />
              </CardContent>
            </Card>
            <Card className="rounded-3xl card-neo pt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Figma className="h-5 w-5" />
                  <div className="font-medium">О проекте</div>
                </div>
                <p className="text-sm opacity-80 leading-6">
                  Этот сайт — дизайн‑центричное портфолио фронтенд‑разработчика: проекты, навыки,
                  опыт и контакты. Готов к деплою и экспорту на GitHub Pages.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button asChild size="sm"><a href="#projects"><Briefcase className="h-4 w-4 mr-1" />Works</a></Button>
                  <Button asChild size="sm" variant="outline"><a href={contacts.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-1" />GitHub</a></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* <Testimonials />   */}

        <Footer />
      </main>
      <StyleBlock />
    </div>
  );
}

// Move the following functions outside of Portfolio

function Testimonials() {
  return (
    <section className="mt-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl p-6">
        <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(400px circle at 20% 0, black, transparent)" }} />
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4" />
                <div className="text-sm opacity-80">Отзыв #{i}</div>
              </div>
              <p className="text-sm opacity-80 leading-6">"Работать с разработчиком было легко: быстрые итерации, чистый код, сильное чувство дизайна."</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 var-bg" />
      <div className="fixed inset-0 -z-10 bg-grid" />
      <div className="fixed inset-0 -z-10 bg-noise opacity-15" />
    </>
  );
}

function StyleBlock() {
  // tokens + export/print styles
  return (
    <style>{`
      :root {
        color-scheme: dark;
        --bg: #0b0d12;
        --bg-accent-1: #10131b;
        --text: #e9edf3;
        --muted: #a7b0c0;
        --card: rgba(255,255,255,.04);
        --card-border: rgba(255,255,255,.12);
        --accent-1: #7aa2ff; /* stable royal blue */
        --accent-2: #5ce1ff; /* cyan */
        --accent-3: #b18cff; /* violet */
      }
      html { scroll-behavior: smooth; }
      body { background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; }

      /* --- base resets to avoid underlines/gaps issues --- */
      a { text-decoration: none; color: inherit; }
      .nav-link { padding: 6px 10px; border-radius: 999px; font-size: 12px; opacity: .9; border: 1px solid transparent; text-decoration: none; }
      .nav-link:hover { border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.05); }

      /* when Button renders a wrapper and <a> inside, make link look like a button */
      .btn-primary a, .btn-ghost a, .btn-glass a { text-decoration: none; display:inline-flex; align-items:center; gap:.5rem; }

      .section { position: relative; }
      .section::before { content: ""; position: absolute; inset-inline: 0; top: -32px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent); }

      .bg-grid {
        background-image:
          linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
        background-size: 40px 40px, 40px 40px;
        background-position: -1px -1px, -1px -1px;
        pointer-events: none;
      }
      .bg-noise { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.45"/></svg>'); mix-blend-mode: soft-light; }
      .var-bg { background:
        radial-gradient(900px circle at 20% 10%, rgba(122,162,255,.12), transparent 40%),
        radial-gradient(800px circle at 85% 15%, rgba(92,225,255,.10), transparent 40%),
        radial-gradient(700px circle at 50% 110%, rgba(177,140,255,.11), transparent 40%),
        var(--bg);
      }

      .glow { background: linear-gradient(90deg, #eaf2ff 0%, var(--accent-1) 38%, var(--accent-2) 66%); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 16px rgba(124,210,255,.25); }

      .btn-primary { position: relative; }
      .btn-primary::before { content: ""; position: absolute; inset: -1px; border-radius: 12px; padding: 1px; background: linear-gradient(135deg, var(--accent-1), var(--accent-2)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
      .btn-ghost { backdrop-filter: blur(6px); }
      .btn-glass { background: rgba(255,255,255,.06); border: 1px solid var(--card-border); backdrop-filter: blur(8px); }

      .card-neo { background: var(--card) !important; border: 1px solid var(--card-border) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 10px 30px rgba(0,0,0,.35); }

      .project-card { background: rgba(10,12,18,.8); box-shadow: 0 10px 30px rgba(0,0,0,.35); }
      .project-card::after { content: ""; position: absolute; inset: 0; border-radius: 24px; pointer-events: none; background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(125,229,255,.08), transparent 40%); transition: opacity .3s; opacity: 0; }
      .project-card:hover::after { opacity: 1; }
      .project-card:hover { transform: translateY(-3px); transition: transform .35s; }

      .pill { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid var(--card-border); backdrop-filter: blur(6px); }

      .link { display: inline-flex; gap: .4rem; align-items: center; opacity: .9; }
      .link:hover { opacity: 1; }
    `}</style>
  );
}
