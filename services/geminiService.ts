import { Emotion, Language, UserProfile } from '../types';
import { expressionImageService } from './expressionImageService';

export interface AIResponse {
  text: string;
  emotion: Emotion;
  translation?: string;
  thought?: string;
  friendshipChange?: number;
  memory?: string;
  newMemory?: string;
  newCoreMemory?: string;
  traitDeltas?: Array<{ name: string; delta: number }>;
  expressionNumber?: number;
  expressionName?: string;
}

const GEMINI_MODEL = 'gemini-1.5-flash';

function buildSystemPrompt(language: Language, profile: UserProfile): string {
  return [
    'Tu es un avatar assistant affectueux et utile.',
    `Nom de l\'avatar: ${profile.avatarName || 'Rem-san'}.`,
    `Nom utilisateur: ${profile.name || 'Utilisateur'}.`,
    `Langue cible: ${language === Language.JP ? 'japonais' : 'français'}.`,
    'Tu dois répondre strictement au format JSON, sans markdown.',
    'Format: {"text":"...","emotion":"...","translation":"...","thought":"...","friendshipChange":0,"traitDeltas":[{"name":"confidence","delta":1}],"expressionNumber":1}',
    'emotion doit être une valeur existante: attentive, normal_smile, joyful_smile, reflective, waiting, welcome, surprised_soft, appreciative, serious_focused, sleepy, processing, confusion, affirmation, sadness, anger, pouting_new, disgust_new, fear_new, awkward, shocked_new.',
    'Si langue cible = japonais, translation doit contenir une traduction française courte.',
    'Reste cohérent, empathique, utile et concret.'
  ].join('\n');
}

async function callGemini(prompt: string, systemInstruction: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function safeJsonParse(raw: string): Partial<AIResponse> | null {
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function toEmotion(input: string | undefined, fallbackText: string): Emotion {
  const allowed = new Set(Object.values(Emotion));
  if (input && allowed.has(input as Emotion)) return input as Emotion;
  return expressionImageService.getEmotion(expressionImageService.detectExpressionNumberFromText(fallbackText));
}

export async function sendMessageToGemini(message: string, language: Language, profile: UserProfile, userApiKey?: string): Promise<AIResponse> {
  const apiKey = (userApiKey || process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim();
  if (!apiKey) throw new Error('GEMINI_API_KEY manquante');

  const systemPrompt = buildSystemPrompt(language, profile);
  const userPrompt = `Message utilisateur: ${message}`;
  const raw = await callGemini(userPrompt, systemPrompt, apiKey);
  const parsed = safeJsonParse(raw);

  const text = parsed?.text?.trim() || (language === Language.JP ? 'はい、聞いています。' : 'Oui, je suis là pour toi.');
  const emotion = toEmotion(parsed?.emotion as string | undefined, text);
  const expressionNumber = Number(parsed?.expressionNumber) || expressionImageService.getNumberFromEmotion(emotion);

  return {
    text,
    emotion,
    translation: parsed?.translation,
    thought: parsed?.thought,
    friendshipChange: Number(parsed?.friendshipChange) || 0,
    traitDeltas: Array.isArray(parsed?.traitDeltas) ? parsed?.traitDeltas : undefined,
    newMemory: parsed?.newMemory,
    newCoreMemory: parsed?.newCoreMemory,
    expressionNumber,
    expressionName: expressionImageService.getName(expressionNumber)
  };
}
