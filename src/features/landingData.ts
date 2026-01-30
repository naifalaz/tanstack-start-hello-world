// src/features/landing/landingData.ts

export type Feature = {
  title: string;
  description: string;
  tone: "primary" | "neutral";
};

export const features: Feature[] = [
  { title: "Instant setup", description: "Start building quickly.", tone: "primary" },
  { title: "TypeScript reliability", description: "Catch mistakes early.", tone: "neutral" },
  { title: "Tailwind styling", description: "Ship consistent design.", tone: "neutral" },
];

export type CallToAction = {
  label: string;
  href: string;
};

export const cta: CallToAction = { label: "Request a Demo", href: "#demo" };