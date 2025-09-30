import React from "react";
import {
  Github,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  CircleDot,
  Figma,
  Cpu,
  User,
  Boxes,
  MessageCircle,
  Globe2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ProjectTypesGrid } from "./components/Projects/ProjectTypesGrid";
import { AboutMe } from "./components/AboutMe";
import { SoftSkills } from "./components/SoftSkills";
import { Experience } from "./components/Experience";
import { contacts } from "./components/data/contacts";
import { ContactForm } from "./components/ContactForm";
import { NavBar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { projects } from "./components/data/projects";
import { ProjectCard } from "./components/ProjectCard";
import "./App.scss";
import { useCursorBackground } from "./hooks/useCursorBackground";



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

        <section id="about" className="mt-6 section">
          <SectionHeader icon={User} title="О себе" subtitle="Кто я и к чему стремлюсь" />
          <AboutMe />
        </section>


        <section id="projects" className="mt-16 section">
          <SectionHeader icon={Briefcase} title="Projects" subtitle="Отобранные работы" />
          <Projects />

          <SectionHeader
            icon={Boxes}
            title="Типы проектов"
            subtitle="Сводка по ключевым направлениям"
          />
          <ProjectTypesGrid />


        </section>

        <section id="skills" className="mt-16 section">
          <SectionHeader icon={Cpu} title="Skills" subtitle="Технологии продакшн‑уровня" />
          <Skills />
        </section>
        <section id="soft-skills" className="mt-16 section">
          <SectionHeader
            icon={CircleDot}
            title="Soft Skills"
            subtitle="Личные качества и рабочие привычки"
          />
          <SoftSkills />
        </section>

        <section id="experience" className="mt-16 section">
          <SectionHeader icon={GraduationCap} title="Experience & Education" subtitle="Опыт и обучение" />
          <Experience />
        </section>

        <section id="contact" className="mt-16 section">
          <SectionHeader icon={Mail} title="Contact" subtitle="Свяжитесь со мной" />
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-3xl card-neo">
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
            <Card className="rounded-3xl card-neo">
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
    </div>
  );
}


function Background() {
  useCursorBackground();

  return (
    <>
      <div className="fixed inset-0 -z-10 var-bg" />
      <div className="fixed inset-0 -z-10 bg-grid" />
      <div className="fixed inset-0 -z-10 bg-noise opacity-15" />
      <div className="fixed inset-0 -z-10 bg-cursor" />
    </>
  );
}


