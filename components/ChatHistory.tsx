import React from 'react';
import { Message, Speaker, Theme } from '../types';

export default function ChatHistory({ messages, onFocus }: { messages: Message[]; theme: Theme; onFocus: () => void; isFocused: boolean; isLoading: boolean; allowThoughtPeek?: boolean }) {
  return (
    <div onClick={onFocus} className="mx-auto mb-4 mt-24 w-full max-w-3xl flex-1 overflow-auto px-4">
      <div className="space-y-2 pb-2">
        {messages.map((m) => (
          <div key={m.id} className={`rounded-xl px-3 py-2 text-sm ${m.speaker === Speaker.USER ? 'ml-12 bg-blue-100' : 'mr-12 bg-white/80'}`}>
            <div>{m.text}</div>
            {m.translation && <div className="mt-1 text-xs text-gray-500">{m.translation}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
