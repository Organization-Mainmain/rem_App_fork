import { Language, UserProfile } from '../types';
import type { AIResponse } from './geminiService';
import { Emotion } from '../types';

export function generateLocalResponse(message: string, _profile: UserProfile, language: Language): AIResponse {
  return {
    text: language === Language.JP
      ? `（Local AI）Message reçu: ${message}`
      : `(IA locale) Message reçu: ${message}`,
    emotion: Emotion.NORMAL_SMILE,
    thought: 'Réponse générée par fallback localAIService.'
  };
}
