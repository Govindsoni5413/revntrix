// ============================================================================
// Revntrix — AI Provider Interface + Gemini Adapter
// AI is OPTIONAL — core conversion never depends on AI (PRD-01 §12, TRD §18)
// ============================================================================

/**
 * AIProvider interface — all AI implementations must satisfy this contract.
 * If AI fails, the structured manual form remains available.
 */
export interface AIProvider {
  /** Summarize customer requirements into a concise brief */
  summarizeRequirements(input: string): Promise<string>;

  /** Assist with custom onboarding — returns an async iterable for streaming */
  assistCustomOnboarding(input: string): AsyncIterable<string>;
}

/**
 * GeminiAdapter — implements AIProvider using Google's Gemini API.
 * Model is configurable via GEMINI_MODEL environment variable.
 */
export class GeminiAdapter implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  }

  get isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async summarizeRequirements(input: string): Promise<string> {
    if (!this.isConfigured) {
      throw new Error("AI is not configured. Using manual form.");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a web design consultant for Revntrix agency. Summarize these client requirements into a concise, professional brief suitable for a sales conversation. Keep it under 200 words.\n\nClient requirements:\n${input}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini.");
    }

    // AI output is untrusted text — caller must sanitize before rendering
    return text;
  }

  async *assistCustomOnboarding(input: string): AsyncIterable<string> {
    if (!this.isConfigured) {
      throw new Error("AI is not configured. Using manual form.");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:streamGenerateContent?alt=sse&key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a web design consultant for Revntrix agency. Help the client articulate their website requirements. Ask clarifying questions and suggest features based on their industry. Be concise and professional.\n\nClient input:\n${input}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body from Gemini.");
    }

    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

        for (const line of lines) {
          const jsonStr = line.slice(6); // Remove "data: "
          if (jsonStr === "[DONE]") return;

          try {
            const data = JSON.parse(jsonStr);
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              yield text;
            }
          } catch {
            // Skip unparseable chunks
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

/**
 * Create an AI provider instance.
 * Returns null if AI is not configured — caller should fall back to manual form.
 */
export function createAIProvider(): AIProvider | null {
  const adapter = new GeminiAdapter();
  return adapter.isConfigured ? adapter : null;
}
