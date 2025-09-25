// Minimal declaration shims so TypeScript doesn't error for missing packages in this demo workspace
declare module 'framer-motion' {
  // permissive shim: components accept any props
  export const motion: any;
  export function useMotionValue(initial: number): { set(v: number): void; get(): number };
  export function useTransform(source: any, input: number[], output: number[]): any;
}

declare module 'lucide-react' {
  type Icon = any;
  export const Github: Icon;
  export const Linkedin: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const MapPin: Icon;
  export const ExternalLink: Icon;
  export const Download: Icon;
  export const Code2: Icon;
  export const Rocket: Icon;
  export const Briefcase: Icon;
  export const GraduationCap: Icon;
  export const CircleDot: Icon;
  export const Hammer: Icon;
  export const Figma: Icon;
  export const Cpu: Icon;
  export const Boxes: Icon;
  export const Star: Icon;
  export const MessageCircle: Icon;
  export const Globe2: Icon;
  export const FileDown: Icon;
  const _default: any;
  export default _default;
}

declare module '@/components/ui/card' {
  export const Card: any;
  export const CardContent: any;
  export const CardHeader: any;
  export const CardTitle: any;
}

declare module '@/components/ui/button' {
  export const Button: any;
}

declare module '@/components/ui/badge' {
  export const Badge: any;
}

declare module '@/components/ui/input' {
  export const Input: any;
}

declare module '@/components/ui/textarea' {
  export const Textarea: any;
}
