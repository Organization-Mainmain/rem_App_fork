import { Language, VoiceSettings } from '../types';

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

  onStart?.();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.pitch = settings.pitch;
  utterance.rate = settings.rate;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}
