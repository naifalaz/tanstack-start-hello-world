// src/features/contact/ContactPage.tsx
import React from 'react';
import { ContactForm } from './ContactForm';

export default function ContactPage(): React.JSX.Element {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 bg-gray-50">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Contact SkyLaunch</h1>
        <p className="text-gray-600">
          Have a question about the product, pricing, or a launch plan? Send us a message and our team will get back to you.
        </p>
      </div>

      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}