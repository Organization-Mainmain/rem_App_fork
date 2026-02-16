import { Emotion, Language, UserProfile } from '../types';

export interface AIResponse {
  text: string;
  emotion: Emotion;
  translation?: string;
  thought?: string;
  friendshipChange?: number;
  memory?: string;
  traitDeltas?: Array<{ name: string; delta: number }>;
  expressionNumber?: number;
  expressionName?: string;
}

export async function sendMessageToGemini(message: string, language: Language, profile: UserProfile): Promise<AIResponse> {
  const name = profile.avatarName || 'Rem-san';
  const prefix = language === Language.JP ? '（Mode démo）' : '(Mode démo)';
  return {
    text: `${prefix} ${name} a bien reçu : "${message}".`,
    emotion: Emotion.ATTENTIVE,
    thought: 'Réponse simulée en local: le service Gemini réel n\'est pas configuré.',
    friendshipChange: 0,
    expressionNumber: 1,
    expressionName: 'Attentive à ton écoute'
  };
}
