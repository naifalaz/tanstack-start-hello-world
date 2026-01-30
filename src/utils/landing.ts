// src/utils/landing.ts

export function formatFeatureCopy(copy: string, maxLength?: number): string {
    let trimmed = copy.trim();

    if (trimmed.length === 0) {
        return "";
    }
    
    const lastChar = trimmed[trimmed.length - 1];
    const endsWithPunctuation = lastChar === "." || lastChar === "!" || lastChar === "?";

    // Add a period if it doesn't end with punctuation
    let formatted = endsWithPunctuation ? trimmed : `${trimmed}.`;

    // If maxLength is provided and the formatted string is too long
    if (maxLength !== undefined && formatted.length > maxLength) {
        // Reserve space for the ellipsis
        const ellipsis = "…";
        const truncateLength = maxLength - ellipsis.length;

        if (truncateLength <= 0) {
            return ellipsis; // maxLength too small, just return …
        }

        formatted = formatted.slice(0, truncateLength).trim();

        // Remove trailing punctuation if it would look weird before ellipsis
        formatted = formatted.replace(/[.!?]$/, "");

        formatted += ellipsis;
    }

    return formatted;
}

export const getCtaLabel = (
    action: string,
    productName: string = "Acme",
    excited: boolean = false
): string => {
    const trimmedAction = action.trim();

    let label: string;

    if (trimmedAction.length === 0) {
        label = `Get started with ${productName}`;
    } else {
        const alreadyMentionsProduct = trimmedAction
            .toLowerCase()
            .includes(productName.toLowerCase());

        label = alreadyMentionsProduct
            ? trimmedAction
            : `${trimmedAction} with ${productName}`;
    }

    // Add ! if excited is true and it doesn't already end with one
    if (excited && !label.endsWith("!")) {
        label += "!";
    }

    return label;
};

/**
 * Formats a price for display.
 * Accepts a number (e.g., 29.99) or a numeric string (e.g., "29.99").
 */
export function formatPrice(
    amount: number | string,
    currency: "USD" | "EUR" = "USD",
    options: { mode: "full" } | { mode: "compact" } = { mode: "full" }
): string {
    let numericAmount: number;

    if (typeof amount === "number") {
        numericAmount = amount;
    } else {
        // Remove common formatting like commas and whitespace
        const cleaned = amount.trim().replace(/,/g, "");
        const parsed = Number(cleaned);

        if (Number.isNaN(parsed)) {
            return "—";
        }

        numericAmount = parsed;
    }

    // Compact mode: 1299 → $1.3K
    if (options.mode === "compact") {
        if (numericAmount >= 1000) {
            const compactAmount = (numericAmount / 1000).toFixed(1);
            return `${currency === "USD" ? "$" : "€"}${compactAmount}K`;
        } else {
            return `${currency === "USD" ? "$" : "€"}${numericAmount}`;
        }
    }

    // Full mode: use Intl.NumberFormat
    // Guard against negative or impossible values (simple UI rule).
    if (numericAmount < 0) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 2
    }).format(numericAmount);
}


function assertUnreachable(value: never): never {
    throw new Error(`Unhandled case: ${String(value)}`);
}

// Learning demo: exhaustive handling with never
type BillingInterval = "month" | "year";

function intervalLabel(interval: BillingInterval): string {
    switch (interval) {
        case "month":
            return "per month";
        case "year":
            return "per year";
        default:
            // If BillingInterval ever gains a new option, TypeScript will force us to handle it.
            return assertUnreachable(interval);
    }
}

// Example of a void-returning function (common in UI handlers)
function logCtaClick(label: string): void {
    console.log(`CTA clicked: ${label}`);
}

// Prevent unused warnings in some setups (optional)
void intervalLabel;
void logCtaClick;