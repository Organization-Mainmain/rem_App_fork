import { Language, UserProfile, Emotion } from '../types';
import type { AIResponse } from './geminiService';

export const coherentLocalAI = {
  generateResponse(message: string, profile: UserProfile, language: Language): AIResponse {
    return {
      text: language === Language.JP
        ? `（Coherent Local AI）${profile.avatarName} répond à: ${message}`
        : `(Coherent Local AI) ${profile.avatarName} répond à : ${message}`,
      emotion: Emotion.REFLECTIVE,
      thought: 'Réponse cohérente simulée sans backend externe.',
      traitDeltas: [{ name: 'confidence', delta: 1 }]
    };
  }
};
