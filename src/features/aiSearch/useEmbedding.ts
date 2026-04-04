import { useCallback, useState } from "react";
import OpenAI from "openai";

export type UseEmbeddingResult = {
  isLoading: boolean;
  error: string | null;
  embed: (input: string) => Promise<number[]>;
};

// Ollama runs locally — no API key needed!
// The OpenAI SDK connects to Ollama's OpenAI-compatible endpoint.
function createClient(): OpenAI {
  return new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama",  // Ollama ignores this, but the SDK requires it
    dangerouslyAllowBrowser: true,
  });
}

export function useEmbedding(): UseEmbeddingResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const embed = useCallback(async (input: string): Promise<number[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const client = createClient();
      const response = await client.embeddings.create({
        model: "qwen3-embedding",
        input,
      });

      const vector = response.data[0]?.embedding;
      if (!vector) {
        throw new Error("Ollama returned no embedding data.");
      }

      return vector;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, embed };
}