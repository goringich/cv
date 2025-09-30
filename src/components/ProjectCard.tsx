import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { projects } from "./data/projects";

export function ProjectCard({ p, idx }: { p: (typeof projects)[number]; idx: number }) {
  return (
    <motion.div
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
            {/* <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" /> */}
          </div>
          <p className="text-sm opacity-80 mt-2">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {p.tags.map(t => (
              <Badge key={t} variant="secondary" className="rounded-full backdrop-blur-sm">{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}