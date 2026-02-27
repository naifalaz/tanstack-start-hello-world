// src/features/landing/LandingPage.tsx

import * as React from "react";
import { Link } from "@tanstack/react-router";
import { features } from "../landingData";
import type { Feature } from "../landingData";
import { CTASection } from "./CTASection";

function FeatureCard({ feature }: { feature: Feature }) {
  const ringClass =
    feature.tone === "primary"
      ? "ring-2 ring-indigo-500"
      : "ring-1 ring-slate-200";

  return (
    <div className={`rounded-xl bg-white p-6 shadow-sm ${ringClass}`}>
      <h3 className="text-lg font-semibold text-slate-900">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {feature.description}
      </p>
    </div>
  );
}

export function LandingPage() {
  const companyName = "SkyLaunch";
  const tagline = "Launch faster with confidence.";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* HERO SECTION */}
        <header className="text-center">
          <p className="text-sm font-semibold tracking-wide text-indigo-600">
            New Product
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {companyName}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {tagline}
          </p>

          {/* Request Demo Button */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/contact"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Request a Demo
            </Link>
          </div>
        </header>

        {/* FEATURES GRID */}
        <section className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="mt-16">
          <CTASection
            headline="Ready to elevate your Launch Experience?"
            body="Get in touch with our team to discover how SkyLaunch can transform your product launches."
            primaryCta={{
              label: "Contact Us",
              to: "/contact",
            }}
          />
        </section>

      </div>
    </main>
  );
}