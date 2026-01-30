// src/components/FeatureList.tsx

import type { Feature } from "../../types/landing";

type FeatureListProps = {
    features: Feature[];
};

export function FeatureList({ features }: FeatureListProps) {
    return (
        <section className="mx-auto max-w-5xl px-6 py-12">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                    <article
                        key={feature.id}
                        className="rounded-xl border border-zinc-200 bg-white p-5"
                    >
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">{feature.title}</h3>
                            {feature.badge ? (
                                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                                    {feature.badge}
                                </span>
                            ) : null}
                        </div>
                        <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
