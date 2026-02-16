import { Language, UserProfile, Emotion } from '../types';
import type { AIResponse } from './geminiService';

export const simpleLocalAI = {
  generateResponse(message: string, _profile: UserProfile, language: Language): AIResponse {
    return {
      text: language === Language.JP
        ? `（Simple Local AI）${message}`
        : `(Simple Local AI) ${message}`,
      emotion: Emotion.NORMAL_SMILE,
      thought: 'Réponse simple locale.'
    };
  }
};
