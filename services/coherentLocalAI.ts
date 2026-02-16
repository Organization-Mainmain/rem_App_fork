import { Language, UserProfile } from '../types';
import type { AIResponse } from './geminiService';
import { expressionImageService } from './expressionImageService';

function computeTraitDelta(message: string) {
  const lower = message.toLowerCase();
  if (/merci|bravo|fi[eè]re|super/.test(lower)) return { name: 'confidence', delta: 2 };
  if (/triste|angoisse|difficile|fatigu/.test(lower)) return { name: 'empathy', delta: 1 };
  return { name: 'consistency', delta: 1 };
}

export const coherentLocalAI = {
  generateResponse(message: string, profile: UserProfile, language: Language): AIResponse {
    const expressionNumber = expressionImageService.detectExpressionNumberFromText(message);
    const emotion = expressionImageService.getEmotion(expressionNumber);
    const traitDelta = computeTraitDelta(message);

    const text = language === Language.JP
      ? `了解。${profile.avatarName} はあなたのために、丁寧に答えるね。`
      : `${profile.avatarName} te répond avec soin : ${message}`;

    return {
      text,
      emotion,
      translation: language === Language.JP ? `${profile.avatarName} te répond avec soin.` : undefined,
      thought: 'Moteur local cohérent activé.',
      friendshipChange: 1,
      traitDeltas: [traitDelta],
      expressionNumber,
      expressionName: expressionImageService.getName(expressionNumber)
    };
  }
};
