import React from 'react';
import { InteractionMode, Language, Theme } from '../types';

type Props = {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isListening: boolean;
  toggleListening: () => void;
  language: Language;
  toggleLanguage: () => void;
  isChatFocused: boolean;
  toggleChatFocus: () => void;
  isLoading: boolean;
  mode: InteractionMode;
  toggleMode: () => void;
  theme: Theme;
  avatarName: string;
};

export default function ChatControls(props: Props) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/40 bg-white/80 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 flex flex-wrap gap-2 text-xs">
        <button onClick={props.toggleLanguage} className="rounded bg-rose-100 px-2 py-1">Langue: {props.language === Language.FR ? 'FR' : 'JP'}</button>
        <button onClick={props.toggleMode} className="rounded bg-rose-100 px-2 py-1">Mode: {props.mode === InteractionMode.STANDARD ? 'Standard' : 'Continu'}</button>
        <button onClick={props.toggleListening} className="rounded bg-rose-100 px-2 py-1">Mic: {props.isListening ? 'ON' : 'OFF'}</button>
        <button onClick={props.toggleChatFocus} className="rounded bg-rose-100 px-2 py-1">Focus: {props.isChatFocused ? 'ON' : 'OFF'}</button>
        <span className="ml-auto text-[11px] text-rose-700">Avatar: {props.avatarName}</span>
      </div>
      <div className="flex gap-2">
        <input
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              props.onSend();
            }
          }}
          placeholder={`Parler avec ${props.avatarName}...`}
          className="flex-1 rounded-lg border border-rose-200 bg-white px-3 py-2 outline-none"
        />
        <button onClick={props.onSend} disabled={props.isLoading} className="rounded-lg bg-rose-600 px-4 py-2 text-white disabled:opacity-60">
          {props.isLoading ? '...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
