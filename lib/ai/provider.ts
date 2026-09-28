import "server-only";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

/**
 * Provider-agnostic model resolver — swap providers by changing env vars only,
 * no code changes. AI_PROVIDER selects the adapter, AI_MODEL is that
 * provider's model id, AI_API_KEY is the provider's key.
 */
export function isAiConfigured() {
  return Boolean(process.env.AI_PROVIDER && process.env.AI_MODEL && process.env.AI_API_KEY);
}

export function getModel(): LanguageModel {
  const provider = process.env.AI_PROVIDER;
  const model = process.env.AI_MODEL;
  const apiKey = process.env.AI_API_KEY;

  if (!provider || !model || !apiKey) {
    throw new Error("AI provider is not configured — set AI_PROVIDER, AI_MODEL, AI_API_KEY.");
  }

  switch (provider) {
    case "openai":
      return createOpenAI({ apiKey })(model);
    case "anthropic":
      return createAnthropic({ apiKey })(model);
    default:
      throw new Error(`Unsupported AI_PROVIDER "${provider}" — use "openai" or "anthropic".`);
  }
}
