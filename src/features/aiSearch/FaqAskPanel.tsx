import { useState } from "react";
import type { FaqAskResponse } from "./types";

export type FaqAskPanelProps = {
  title?: string;
};

async function askFaq(question: string): Promise<FaqAskResponse> {
  // TODO: Wire this to your real FAQ/RAG implementation.
  // Options:
  // 1) Supabase Edge Function: supabase.functions.invoke("faq_ask", { body: { question } })
  // 2) A server proxy you created: fetch("/your-endpoint", ...)
  // 3) A Postgres RPC that returns answer + sources
  //
  // We return a friendly placeholder so the UI is testable today.
  return {
    answer:
      "This is a placeholder answer. Connect askFaq() to your RAG pipeline to generate real answers grounded in your FAQ sources.",
    sources: [
      {
        title: "SkyLaunch FAQ (Example Source)",
        url: "https://example.com/faq",
        snippet: "Replace this snippet with the retrieved text chunk used to answer the question.",
      },
    ],
  };
}

export function FaqAskPanel(props: FaqAskPanelProps) {
  const panelTitle = props.title ?? "FAQ: Ask a Question";

  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<FaqAskResponse | null>(null);

  async function onSubmit() {
    const q = question.trim();
    setError(null);

    if (!q) {
      setError("Please type a question first.");
      return;
    }

    setIsLoading(true);
    try {
      const r = await askFaq(q);
      setResponse(r);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">{panelTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Ask a question and show an answer with sources. This UI is designed for RAG: retrieval + grounded response.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="faq-question">
          Your question
        </label>
        <textarea
          id="faq-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., What is SkyLaunch’s return policy?"
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Asking…" : "Ask"}
          </button>
          <button
            type="button"
            onClick={() => {
              setQuestion("");
              setResponse(null);
              setError(null);
            }}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          <p className="font-medium">Could not answer</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : null}

      {response ? (
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">Answer</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{response.answer}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Sources</p>
            {response.sources.length === 0 ? (
              <p className="mt-1 text-sm text-slate-600">No sources were provided.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {response.sources.map((s, idx) => (
                  <li key={`${s.title}-${idx}`} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{s.title}</p>
                        {s.snippet ? (
                          <p className="mt-1 text-sm text-slate-600">{s.snippet}</p>
                        ) : null}
                      </div>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          Open
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-slate-200 p-3 text-sm text-slate-600">
          Ask a question to see an answer and sources appear here.
        </div>
      )}
    </section>
  );
}

