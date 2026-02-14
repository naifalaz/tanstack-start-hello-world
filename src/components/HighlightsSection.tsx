// src/components/HighlightsSection.tsx

import type { ReactNode } from "react"

export interface HighlightsSectionProps {
    heading: string
    subheading?: string
    children: ReactNode
}

export function HighlightsSection({ heading, subheading, children }: HighlightsSectionProps) {
    return (
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <header>
                <h2 className="text-lg font-semibold text-zinc-900">{heading}</h2>
                {subheading ? <p className="mt-1 text-sm text-zinc-600">{subheading}</p> : null}
            </header>

            <div className="mt-4">{children}</div>
        </section>
    )
}

// Parent usage example:
// <HighlightsSection heading="Why customers love this" subheading="Highlights are passed as props">
//   <div className="grid gap-4 sm:grid-cols-2">
//     {highlights.map(...)}
//   </div>
// </HighlightsSection>