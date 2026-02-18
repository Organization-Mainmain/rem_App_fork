import React from 'react';
import { Message, Speaker, Theme } from '../../types';

type Props = {
  messages: Message[];
  theme: Theme;
  onFocus: () => void;
  isFocused: boolean;
  isLoading: boolean;
  allowThoughtPeek?: boolean;
};

export default function ChatHistory({ messages, onFocus, isLoading, allowThoughtPeek }: Props) {
  return (
    <div onClick={onFocus} className="mx-auto mb-4 mt-24 w-full max-w-3xl flex-1 overflow-auto px-4 scrollbar-hide">
      <div className="space-y-3 pb-2">
        {messages.map((m) => (
          <div key={m.id} className={`rounded-xl px-3 py-2 text-sm shadow-sm ${m.speaker === Speaker.USER ? 'ml-12 bg-blue-100' : 'mr-12 bg-white/90'}`}>
            <div className="whitespace-pre-wrap">{m.text}</div>
            {m.translation && <div className="mt-1 text-xs text-gray-500">FR: {m.translation}</div>}
            {allowThoughtPeek && m.thought && <div className="mt-1 text-[11px] italic text-gray-400">💭 {m.thought}</div>}
            {(m.expressionNumber || m.expressionName) && (
              <div className="mt-1 text-[10px] uppercase tracking-wide text-rose-500">
                Expression {m.expressionNumber ?? '?'} {m.expressionName ? `· ${m.expressionName}` : ''}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="mr-12 rounded-xl bg-white/70 px-3 py-2 text-xs text-gray-600">Rem-san réfléchit…</div>}
      </div>
    </div>
  );
}
