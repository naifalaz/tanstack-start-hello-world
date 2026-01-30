// src/components/LandingUtilitiesDemo.tsx

import { formatFeatureCopy, formatPrice, getCtaLabel } from "../utils/landing";

export function LandingUtilitiesDemo() {
    const feature = formatFeatureCopy("  blazing fast setup  ");
    const feature2 = formatFeatureCopy("Works offline!");

    const cta = getCtaLabel("Get started", "Orbit");
    const ctaWithDefault = getCtaLabel("Learn more");

    const price1 = formatPrice(29.99, "USD");
    const price2 = formatPrice("1,299", "USD");
    const priceBad = formatPrice("free", "USD");

    return (
        <section className="mx-auto max-w-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold">Landing Utilities Demo</h2>

            <div className="space-y-1">
                <p className="text-sm text-gray-600">Feature copy:</p>
                <p className="font-medium">{feature}</p>
                <p className="font-medium">{feature2}</p>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-600">CTA labels:</p>
                <p className="font-medium">{cta}</p>
                <p className="font-medium">{ctaWithDefault}</p>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-600">Prices:</p>
                <p className="font-medium">{price1}</p>
                <p className="font-medium">{price2}</p>
                <p className="font-medium">{priceBad}</p>
            </div>
        </section>
    );
}
