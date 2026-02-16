import React from 'react';
import { AvatarState } from '../types';

export default function Avatar({ state, isAvatarOnlyView }: { state: AvatarState; isAvatarOnlyView?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center ${isAvatarOnlyView ? 'scale-110' : ''}`}>
      <div className="w-56 h-56 rounded-full bg-white/70 border-4 border-rose-300 shadow-2xl flex items-center justify-center text-6xl">
        {state.isTalking ? '🗣️' : '😊'}
      </div>
      <p className="mt-4 text-sm font-semibold text-rose-900">Expression: {state.emotion}</p>
    </div>
  );
}
