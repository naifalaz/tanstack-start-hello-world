// src/type-playground.ts

// Primitive types
const companyName: string = "SkyLaunch"
const foundedYear: number = 2025
const isHiring: boolean = true

// Type inference: TypeScript infers `tagline` is a string because of the value
const tagline = "Launch faster with confidence."

// Object type (like a typed Python dict)
const cta: { label: string; href: string } = {
  label: "Get Started",
  href: "/signup",
}

// Array type (like List[str] in Python)
const featureTitles: string[] = [
  "Instant setup",
  "Type-safe UI",
  "Beautiful styling",
]

// Interface (a reusable “shape”)
interface Feature {
  title: string
  description: string
  // Union type: only these values are allowed
  tone: "primary" | "neutral"
}

const features: Feature[] = [
  {
    title: "Instant setup",
    description: "Start building in minutes with a modern starter.",
    tone: "primary",
  },
  {
    title: "TypeScript reliability",
    description: "Catch mistakes early with typed props and data.",
    tone: "neutral",
  },
  {
    title: "Tailwind styling",
    description: "Create a clean, consistent design fast.",
    tone: "neutral",
  },
]

// Try causing a type error:
// features[0].tone = "loud" // ❌ not allowed; must be "primary" or "neutral"