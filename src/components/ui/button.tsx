import * as React from "react"
import { cn } from "@/lib/cn"

type ButtonVariant = "default" | "secondary" | "outline" | "ghost"
type ButtonSize = "sm" | "default" | "l"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white/[.08] hover:bg-white/[.12]",
  secondary: "bg-white/[.06] hover:bg-white/[.1]",
  outline: "bg-transparent hover:bg-white/[.06]",
  ghost: "border-transparent bg-transparent hover:bg-white/[.06]",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  default: "px-3.5 py-2 text-sm",
  l: "px-4 py-2.5 text-sm",
}

export function Button({
  className,
  asChild,
  variant = "default",
  size = "default",
  children,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl border border-white/10 transition",
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
