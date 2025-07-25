"use client"

import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "../../lib/utils"

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
    variant?: "default" | "glow"
  }
  withGlow?: boolean
  className?: string
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
  className,
}: CTAProps) {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className="opacity-0 animate-fade-in-up delay-100 border-white/20 bg-white/10 text-white backdrop-blur-sm"
          >
            <span className="text-white/90">{badge.text}</span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200 text-white">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-white/80 opacity-0 animate-fade-in-up delay-300 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Action Button */}
        <Button
          variant="secondary"
          size="lg"
          className="opacity-0 animate-fade-in-up delay-500 bg-white text-indigo-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg"
          asChild
        >
          <a href={action.href}>{action.text}</a>
        </Button>

        {/* Glow Effect */}
        {withGlow && (
          <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
        )}
      </div>
    </section>
  )
}