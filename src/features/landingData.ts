// src/features/landing/landingData.ts

export type Feature = {
  title: string;
  description: string;
  tone: "primary" | "neutral";
};

export const features: Feature[] = [
  { title: "Instant setup", description: "Start building in minutes with a modern TanStack Start Foundation.", tone: "primary" },
  { title: "TypeScript reliability", description: "Catch data and UI mistakes before they reach your users.", tone: "neutral" },
  { title: "Tailwind styling", description: "Ship a clean, consistent design without wrestling CSS naming.", tone: "neutral" },
];

export type CallToAction = {
  label: string;
  href: string;
};

export const cta: CallToAction = { label: "Request a Demo", href: "#demo" };