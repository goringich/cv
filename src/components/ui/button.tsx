import * as React from "react"
import { cn } from "@/lib/cn"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
export function Button({ className, asChild, ...props }: Props) {
  const Cmp: any = asChild ? "span" : "button"
  return (
    <Cmp
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm border border-white/10 bg-white/[.05] hover:bg-white/[.08] transition",
        className
      )}
      {...props}
    />
  )
}
