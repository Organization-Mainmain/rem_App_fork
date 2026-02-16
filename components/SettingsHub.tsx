import React from 'react';
import { Emotion, Gift, UserProfile, VoiceSettings } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onUpdateSettings: (s: VoiceSettings) => void;
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  currentEmotion: Emotion;
  onUpdateEmotion: (e: Emotion) => void;
  customImages: Record<number, string>;
  onUpdateCustomImage: (id: number, file: File) => void;
  onSendGift: (gift: Gift | string) => void;
  onSyncEmails: () => void;
  onClearConversation: () => void;
  onExportUserData: () => void;
  onImportUserData: (file: File) => void;
};

export default function SettingsHub({ isOpen, onClose, profile, onClearConversation, onExportUserData }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold">Paramètres ({profile.avatarName})</h2>
        <p className="mt-2 text-sm text-gray-600">Panneau minimal de démonstration.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={onClearConversation} className="rounded bg-rose-100 px-3 py-2 text-sm">Vider la conversation</button>
          <button onClick={onExportUserData} className="rounded bg-rose-100 px-3 py-2 text-sm">Exporter les données</button>
          <button onClick={onClose} className="ml-auto rounded bg-rose-600 px-3 py-2 text-sm text-white">Fermer</button>
        </div>
      </div>
    </div>
  );
}
