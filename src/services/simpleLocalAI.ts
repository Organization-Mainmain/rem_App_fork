import { Language, UserProfile } from '../types';
import type { AIResponse } from './geminiService';
import { generateLocalResponse } from './localAIService';

export const simpleLocalAI = {
  generateResponse(message: string, profile: UserProfile, language: Language): AIResponse {
    return generateLocalResponse(message, profile, language);
  }
};
