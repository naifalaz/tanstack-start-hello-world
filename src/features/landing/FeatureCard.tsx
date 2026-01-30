// src/features/landing/FeatureCard.tsx

import type { Feature } from "../landingData"

type FeatureCardProps = {
  feature: Feature
}

function iconFor(key: Feature["icon"]) {
  // Simple placeholder icons using text. You can swap in an icon library later.
  switch (key) {
    case "bolt":
      return "⚡"
    case "shield":
      return "🛡️"
    case "chart":
      return "📈"
    default:
      return "✨"
  }
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
          {iconFor(feature.icon)}
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}