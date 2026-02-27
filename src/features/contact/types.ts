// src/features/contact/types.ts

export type ContactFormState = {
    name: string
    email: string
    message: string
}

// Use "string | undefined" so "no error" is represented by undefined.
export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>

// Touched tells us if a field has been visited (blurred) at least once.
export type ContactFormTouched = Partial<Record<keyof ContactFormState, boolean>>