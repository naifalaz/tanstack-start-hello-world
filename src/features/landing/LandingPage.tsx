// src/features/landing/LandingPage.tsx

import * as React from "react";
import { features, cta } from "../landingData"; // your feature data and CTA type
import type { Feature, CallToAction } from "../landingData";

function FeatureCard(props: { feature: Feature }) {
  const { feature } = props;
  const ringClass =
    feature.tone === "primary" ? "ring-2 ring-indigo-500" : "ring-1 ring-slate-200";

  return (
    <div className={`rounded-xl bg-white p-6 shadow-sm ${ringClass}`}>
      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
    </div>
  );
}

export function LandingPage() {
  const companyName = "SkyLaunch";
  const tagline = "Launch faster with confidence.";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="text-center">
          <p className="text-sm font-semibold tracking-wide text-indigo-600">New Product</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {companyName}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">{tagline}</p>

          <div className="mt-8 flex justify-center">
            <a
              href={cta.href}
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {cta.label}
            </a>
          </div>
        </header>

        <section className="mt-14">
          <h2 className="sr-only">Feature highlights</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}