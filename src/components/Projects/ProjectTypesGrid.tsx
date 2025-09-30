import { motion } from 'framer-motion';
import { projectTypes } from './ProjectsTypes';

export function ProjectTypesGrid() {
  const entries = Object.entries(projectTypes).filter(([, v]) => v.items.length);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map(([key, block]) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border border-white/10 card-neo overflow-hidden`}
        >
          <div
            className={`px-5 py-4 border-b border-white/10 bg-gradient-to-tr ${block.color}`}
          >
            <div className="text-sm opacity-80">Типы проектов</div>
            <div className="text-base font-semibold leading-tight tracking-tight">
              {block.title}
            </div>
          </div>

          <div className="p-5">
            <ul className="grid gap-2">
              {block.items.map((txt, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2"
          >
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/50" />
            <span className="text-sm opacity-90">{txt}</span>
          </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
