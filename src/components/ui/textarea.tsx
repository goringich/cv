import * as React from "react"
import { cn } from "../../lib/cn"
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("w-full rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-white/20", className)}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"
