import { Language, UserProfile } from '../types';
import type { AIResponse } from './geminiService';
import { expressionImageService } from './expressionImageService';

const OLLAMA_ENDPOINT = 'http://127.0.0.1:11434/api/generate';

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 7000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export const ollamaService = {
  async generateResponse(message: string, profile: UserProfile, language: Language): Promise<AIResponse> {
    const prompt = language === Language.JP
      ? `あなたは${profile.avatarName}です。次のメッセージに短く優しく答えてください: ${message}`
      : `Tu es ${profile.avatarName}. Réponds en français de façon courte, utile et affectueuse au message: ${message}`;

    const response = await fetchWithTimeout(OLLAMA_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.2', prompt, stream: false })
    });

    if (!response.ok) {
      throw new Error(`Ollama HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = (data?.response || '').trim();
    if (!text) throw new Error('Réponse Ollama vide');

    const expressionNumber = expressionImageService.detectExpressionNumberFromText(text);
    return {
      text,
      emotion: expressionImageService.getEmotion(expressionNumber),
      translation: language === Language.JP ? 'Réponse générée localement par Ollama.' : undefined,
      thought: 'Réponse générée via Ollama local.',
      expressionNumber,
      expressionName: expressionImageService.getName(expressionNumber)
    };
  }
};
