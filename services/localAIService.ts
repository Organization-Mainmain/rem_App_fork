import { Emotion, Language, UserProfile } from '../types';
import type { AIResponse } from './geminiService';
import { expressionImageService } from './expressionImageService';

function responseByLanguage(language: Language, fr: string, jp: string): string {
  return language === Language.JP ? jp : fr;
}

export function generateLocalResponse(message: string, profile: UserProfile, language: Language): AIResponse {
  const expressionNumber = expressionImageService.detectExpressionNumberFromText(message);
  const emotion = expressionImageService.getEmotion(expressionNumber);
  const text = responseByLanguage(
    language,
    `Je t'écoute ${profile.name || 'avec attention'}. Tu as dit : ${message}`,
    `わかったよ。${message} について一緒に考えよう。`
  );

  return {
    text,
    emotion,
    translation: language === Language.JP ? `Je t'écoute. Tu as dit: ${message}` : undefined,
    thought: 'Réponse locale heuristique.',
    friendshipChange: 1,
    expressionNumber,
    expressionName: expressionImageService.getName(expressionNumber)
  };
}
