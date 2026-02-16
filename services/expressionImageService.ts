import { Emotion } from '../types';

const EXPRESSION_MAP: Record<number, { name: string; emotion: Emotion }> = {
  1: { name: 'Attentive à ton écoute', emotion: Emotion.ATTENTIVE },
  2: { name: 'Neutre / normale', emotion: Emotion.NORMAL_SMILE },
  3: { name: 'Sourire joyeux', emotion: Emotion.JOYFUL_SMILE },
  4: { name: 'Réflexion', emotion: Emotion.REFLECTIVE },
  5: { name: 'En attente / en veille', emotion: Emotion.WAITING },
  6: { name: 'Accroche / bienvenue', emotion: Emotion.WELCOME },
  7: { name: 'Surprise douce', emotion: Emotion.SURPRISED_SOFT },
  8: { name: 'Appréciation / contentement', emotion: Emotion.APPRECIATIVE },
  9: { name: 'Sérieuse / concentrée', emotion: Emotion.SERIOUS_FOCUSED },
  10: { name: 'Fatiguée / endormie', emotion: Emotion.SLEEPY },
  11: { name: "Je traite l'information", emotion: Emotion.PROCESSING },
  12: { name: 'Confusion / erreur', emotion: Emotion.CONFUSION },
  13: { name: 'Affirmation / OK', emotion: Emotion.AFFIRMATION },
  14: { name: 'Tristesse', emotion: Emotion.SADNESS },
  15: { name: 'Colère', emotion: Emotion.ANGER },
  16: { name: 'Boudeuse', emotion: Emotion.POUTING_NEW },
  17: { name: 'Dégoût / grimace', emotion: Emotion.DISGUST_NEW },
  18: { name: 'Peur / effrayée', emotion: Emotion.FEAR_NEW },
  19: { name: 'Gênée / malaise doux', emotion: Emotion.AWKWARD },
  20: { name: 'Choquée', emotion: Emotion.SHOCKED_NEW }
};

const EMOTION_TO_NUMBER: Partial<Record<Emotion, number>> = Object.entries(EXPRESSION_MAP).reduce((acc, [id, val]) => {
  acc[val.emotion] = Number(id);
  return acc;
}, {} as Partial<Record<Emotion, number>>);

function pickByKeywords(text: string): number {
  const t = text.toLowerCase();
  if (/bonjour|salut|coucou|welcome|bienvenue/.test(t)) return 6;
  if (/merci|bravo|super|génial|excellent/.test(t)) return 8;
  if (/triste|déçu|peine|pleure/.test(t)) return 14;
  if (/col[eè]re|énerv|fâch|rage/.test(t)) return 15;
  if (/peur|effray|angoiss|terrifi/.test(t)) return 18;
  if (/choqu|incroyable|impossible/.test(t)) return 20;
  if (/confus|erreur|bug|comprends pas/.test(t)) return 12;
  if (/\?/.test(t)) return 5;
  if (/\!/.test(t)) return 3;
  return 2;
}

export const expressionImageService = {
  getName(id: number): string | undefined {
    return EXPRESSION_MAP[id]?.name;
  },
  getEmotion(id: number): Emotion {
    return EXPRESSION_MAP[id]?.emotion ?? Emotion.NORMAL_SMILE;
  },
  getImagePath(id: number): string {
    return `/expressions/${id}.png`;
  },
  getNumberFromEmotion(emotion: Emotion): number {
    return EMOTION_TO_NUMBER[emotion] ?? 2;
  },
  detectExpressionNumberFromText(text: string): number {
    return pickByKeywords(text);
  }
};
