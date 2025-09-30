import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, MessageCircle, Globe2, Download, Code2, Hammer, Boxes, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { contacts } from "./data/contacts";
import { skills } from "./data/skills";

function useSpotlight() {
  // performance‑friendly: static gradient without mouse tracking
  const ref = useRef<HTMLDivElement | null>(null);
  const bg = "radial-gradient(500px circle at 20% 20%, rgba(77,130,255,0.12), transparent 60%)";
  return { ref, bg };
}





export function Hero() {
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
            <a href="screen.pdf" download>
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
        <Card className="rounded-3xl card-neo col-span-2 pt-1">
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
        <Card className="rounded-3xl card-neo">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2 pt-1">
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
        <Card className="rounded-3xl card-neo">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2 pt-1">
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