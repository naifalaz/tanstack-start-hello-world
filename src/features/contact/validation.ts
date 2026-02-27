// src/features/contact/validation.ts

import type { ContactFormErrors, ContactFormState } from './types'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validate(form: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}