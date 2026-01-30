// src/features/landing/FeatureGrid.tsx

import type { Feature } from "../landingData"
import { FeatureCard } from "./FeatureCard"

type FeatureGridProps = {
  title: string
  subtitle?: string
  features: Feature[]
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <div id="features">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </div>
  )
}
