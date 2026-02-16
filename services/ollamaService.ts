import { Language, UserProfile, Emotion } from '../types';
import type { AIResponse } from './geminiService';

export const ollamaService = {
  async generateResponse(message: string, profile: UserProfile, language: Language): Promise<AIResponse> {
    return {
      text: language === Language.JP
        ? `（Ollama indisponible）${profile.avatarName}: ${message}`
        : `(Ollama indisponible) ${profile.avatarName} a reçu : ${message}`,
      emotion: Emotion.PROCESSING,
      thought: 'Mode simulation: brancher un serveur Ollama pour une vraie réponse.'
    };
  }
};
