import * as React from "react"
import { cn } from "@/lib/cn"
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("w-full rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-white/20", className)}
      {...props}
    />
  )
)
Input.displayName = "Input"
