// src/features/landing/Hero.tsx

type HeroProps = {
    badgeText?: string
    headline: string
    subheadline: string
    primaryCta: {
      label: string
      href: string
    }
    secondaryCta?: {
      label: string
      href: string
    }
  }

  export function Hero({
    badgeText = "New",
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
  }: HeroProps) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 sm:p-10">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
          {badgeText}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {headline}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={primaryCta.href}
            className="inline-flex justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {primaryCta.label}
          </a>

          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
    )
  }
