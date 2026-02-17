import React from 'react';
import { AvatarState, Emotion } from '../types';
import { expressionImageService } from '../services/expressionImageService';

const emojiFallbackByEmotion: Partial<Record<Emotion, string>> = {
  [Emotion.ATTENTIVE]: '🫶',
  [Emotion.NORMAL_SMILE]: '😊',
  [Emotion.JOYFUL_SMILE]: '😄',
  [Emotion.REFLECTIVE]: '🤔',
  [Emotion.WAITING]: '😯',
  [Emotion.SLEEPY]: '😴',
  [Emotion.ANGER]: '😠',
  [Emotion.SADNESS]: '😢'
};

export default function Avatar({ state, isAvatarOnlyView }: { state: AvatarState; isAvatarOnlyView?: boolean }) {
  const expressionNumber = expressionImageService.getNumberFromEmotion(state.emotion);
  const imagePath = state.customImages?.[expressionNumber] || expressionImageService.getImagePath(expressionNumber);
  const fallbackEmoji = emojiFallbackByEmotion[state.emotion] || '🌸';

  return (
    <div className={`flex flex-col items-center justify-center transition-all ${isAvatarOnlyView ? 'scale-110' : ''}`}>
      <div className={`relative overflow-hidden rounded-full border-4 border-rose-300 bg-white/70 shadow-2xl ${state.isTalking ? 'animate-talk' : 'animate-breathe'} h-72 w-72`}>
        <img
          src={imagePath}
          alt={expressionImageService.getName(expressionNumber) || 'Avatar'}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 hidden items-center justify-center text-7xl">{fallbackEmoji}</div>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-900">
        Expression {expressionNumber} · {expressionImageService.getName(expressionNumber)}
      </p>
    </div>
  );
}
