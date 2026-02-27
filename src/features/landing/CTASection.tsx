// src/features/landing/CTASection.tsx

import { Link } from "@tanstack/react-router";

type CTASectionProps = {
  id?: string;
  headline: string;
  body: string;
  primaryCta: {
    label: string;
    to: string;
  };
};

export function CTASection({
  id = "get-started",
  headline,
  body,
  primaryCta,
}: CTASectionProps) {
  return (
    <div
      id={id}
      className="rounded-2xl bg-black p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {headline}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
            {body}
          </p>
        </div>

        <Link
          to={primaryCta.to}
          className="inline-flex justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-slate-200"
        >
          {primaryCta.label}
        </Link>
      </div>
    </div>
  );
}