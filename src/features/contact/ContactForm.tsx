import React from 'react';
import type {ContactFormState, ContactFormErrors, ContactFormTouched } from "./types"


// type ContactFormState = {
//   name: string;
//   email: string;
//   message: string;
// };

// export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;
// export type ContactFormTouched = Partial<Record<keyof ContactFormState, boolean>>;

function validate(values: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = 'Please enter a valid email.';
    }
  }

  if (!values.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

export function ContactForm(): React.JSX.Element {
  const initialForm: ContactFormState = {
    name: '',
    email: '',
    message: '',
  };

  const [values, setValues] = React.useState(initialForm);
  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [touched, setTouched] = React.useState<ContactFormTouched>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Refs for focus management
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  const isFormValid = Object.keys(validate(values)).length === 0;
  const isSubmitDisabled = isSubmitting || !isFormValid;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validate(values);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof ContactFormState],
    }));
  }

  async function fakeSubmit(data: ContactFormState) {
    return new Promise<void>((resolve) =>
      setTimeout(() => resolve(), 2000)
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      // Focus first invalid field
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await fakeSubmit(values);
      setIsSubmitted(true);
      setValues(initialForm);
      setTouched({});
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  function inputClass(field: keyof ContactFormState) {
    return (
      'w-full rounded-md border px-3 py-2 outline-none ' +
      (errors[field] && touched[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-gray-300 focus:border-indigo-500')
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      {/* Accessible Success Message */}
      {isSubmitted && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900"
        >
          Thanks! Your message was sent to SkyLaunch.
        </div>
      )}

      {/* NAME */}
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={inputClass('name')}
        />
        {errors.name && touched.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="text-sm text-red-600 mt-1"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={inputClass('email')}
        />
        {errors.email && touched.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="text-sm text-red-600 mt-1"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          className={inputClass('message')}
        />
        {errors.message && touched.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="text-sm text-red-600 mt-1"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={
          'rounded-md px-4 py-2 text-sm font-medium text-white transition ' +
          (isSubmitDisabled
            ? 'bg-gray-400 opacity-60 cursor-not-allowed'
            : 'bg-zinc-900 hover:bg-zinc-800')
        }
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}