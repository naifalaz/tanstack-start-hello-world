// src/types/landing.ts

export type FeatureId = `feature_${number}`;

export interface Feature {
  readonly id: FeatureId;
  title: string;
  description: string;
  badge?: "New" | "Popular" | "Beta";
}

export type CompanyInfo = {
  name: string;
  tagline: string;
  foundedYear: number;
  websiteUrl: `https://${string}`;
};