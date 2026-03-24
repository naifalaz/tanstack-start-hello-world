// src/features/contact/ContactPage.tsx
import React, { useState } from "react";

export default function ContactPage(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !message) return;
    // Here you would send the message to your backend or Supabase
    setSent(true);
    // Optionally, reset fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main className="flex justify-center py-10 bg-gray-50">
      {/* Big Tile */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Title and description */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            Contact SkyLaunch
          </h1>
          <p className="text-gray-600">
            Have a question about the product, pricing, or a launch plan? Send us a message and our team will get back to you.
          </p>
        </div>

        {/* Smaller Tile (Form + Success message) */}
        <div className="bg-gray-100 rounded-md p-6 space-y-4">
          {sent && (
            <div className="bg-green-100 text-green-800 rounded-md p-3 font-semibold">
              Thanks! Your message was sent to SkyLaunch.
            </div>
          )}

          {/* Name field */}
          <div className="space-y-1">
            <label className="font-bold block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email field */}
          <div className="space-y-1">
            <label className="font-bold block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Message field */}
          <div className="space-y-1">
            <label className="font-bold block">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Send Message button */}
          <button
            onClick={handleSend}
            disabled={!message || !name || !email}
            className={`w-full text-white font-bold rounded-md p-2 mt-2 ${
              message && name && email
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Send Message
          </button>

          {/* Disclaimer */}
          <p className="text-sm text-gray-500 mt-2">
            By sending, you agree SkyLaunch may contact you about your request.
          </p>
        </div>
      </div>
    </main>
  );
}