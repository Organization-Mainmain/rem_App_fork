import { Language, VoiceSettings } from '../types';

function pickFemaleVoice(lang: Language, preferredName?: string): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  if (preferredName) {
    const exact = voices.find((v) => v.name === preferredName);
    if (exact) return exact;
  }

  const targetPrefix = lang === Language.JP ? 'ja' : 'fr';
  const filtered = voices.filter((v) => v.lang.toLowerCase().startsWith(targetPrefix));
  const femaleHints = /(female|femme|woman|kyoko|haruka|sakura|amelie|audrey|hortense|marie|yuna)/i;

  return filtered.find((v) => femaleHints.test(v.name)) || filtered[0] || voices[0];
}

export async function speakText(
  text: string,
  language: Language,
  settings: VoiceSettings,
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  if (!settings.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  await new Promise<void>((resolve) => {
    onStart?.();
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.voice = pickFemaleVoice(language, settings.voiceName) || null;

    utterance.onend = () => {
      onEnd?.();
      resolve();
    };
    utterance.onerror = () => {
      onEnd?.();
      resolve();
    };

    synth.speak(utterance);
  });
}
