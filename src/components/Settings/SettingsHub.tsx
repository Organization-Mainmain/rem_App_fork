import React, { useEffect, useMemo, useState } from 'react';
import { Emotion, Gift, UserProfile, VoiceSettings } from '../../types';

const GIFTS: Gift[] = [
  { id: 'tea', name: 'Thé chaud', icon: '🍵', points: 3, label: 'Offrir un thé' },
  { id: 'flower', name: 'Fleur', icon: '🌸', points: 5, label: 'Offrir une fleur' },
  { id: 'cake', name: 'Gâteau', icon: '🍰', points: 8, label: 'Offrir un gâteau' }
];

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
  onImportUserData: (data: any) => void;
  geminiApiKey: string;
  onUpdateGeminiApiKey: (key: string) => void;
};

export default function SettingsHub({
  isOpen,
  onClose,
  profile,
  settings,
  onUpdateProfile,
  onUpdateSettings,
  onSendGift,
  onSyncEmails,
  onClearConversation,
  onExportUserData,
  onImportUserData,
  geminiApiKey,
  onUpdateGeminiApiKey
}: Props) {
  const [localName, setLocalName] = useState(profile.name || '');
  const [localAvatarName, setLocalAvatarName] = useState(profile.avatarName || 'Rem-san');
  const [localGeminiKey, setLocalGeminiKey] = useState(geminiApiKey || '');

  useEffect(() => {
    setLocalName(profile.name || '');
    setLocalAvatarName(profile.avatarName || 'Rem-san');
  }, [profile.name, profile.avatarName]);

  useEffect(() => {
    setLocalGeminiKey(geminiApiKey || '');
  }, [geminiApiKey]);

  const friendshipLabel = useMemo(() => {
    const v = profile.friendshipLevel || 0;
    if (v >= 80) return 'Fusion émotionnelle';
    if (v >= 50) return 'Forte connexion';
    if (v >= 20) return 'Lien naissant';
    return 'Découverte';
  }, [profile.friendshipLevel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-auto">
        <h2 className="text-lg font-bold">Paramètres de Rem App</h2>

        <section className="mt-4 rounded-xl border p-3">
          <h3 className="text-sm font-semibold">Profil</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input value={localName} onChange={(e) => setLocalName(e.target.value)} placeholder="Votre nom" className="rounded border px-2 py-1" />
            <input value={localAvatarName} onChange={(e) => setLocalAvatarName(e.target.value)} placeholder="Nom de l'avatar" className="rounded border px-2 py-1" />
          </div>
          <button
            onClick={() => onUpdateProfile({ ...profile, name: localName, avatarName: localAvatarName })}
            className="mt-2 rounded bg-rose-600 px-3 py-1 text-sm text-white"
          >
            Sauvegarder le profil
          </button>
          <p className="mt-2 text-xs text-gray-600">Amitié: {profile.friendshipLevel}/100 · {friendshipLabel}</p>
        </section>

        <section className="mt-4 rounded-xl border p-3">
          <h3 className="text-sm font-semibold">API Gemini</h3>
          <input
            type="password"
            value={localGeminiKey}
            onChange={(e) => setLocalGeminiKey(e.target.value)}
            placeholder="Collez votre clé Gemini"
            className="mt-2 w-full rounded border px-2 py-1"
          />
          <button
            onClick={() => onUpdateGeminiApiKey(localGeminiKey.trim())}
            className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white"
          >
            Sauvegarder la clé API
          </button>
        </section>

        <section className="mt-4 rounded-xl border p-3">
          <h3 className="text-sm font-semibold">Voix féminines FR/JP</h3>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.enabled} onChange={(e) => onUpdateSettings({ ...settings, enabled: e.target.checked })} />
            Activer la synthèse vocale
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={() => onUpdateSettings({ ...settings, voiceName: 'Google français' })} className="rounded bg-rose-100 px-2 py-1 text-xs">Preset FR féminin</button>
            <button onClick={() => onUpdateSettings({ ...settings, voiceName: 'Google 日本語' })} className="rounded bg-rose-100 px-2 py-1 text-xs">Preset JP féminin</button>
            <button onClick={() => onUpdateSettings({ ...settings, voiceName: '' })} className="rounded bg-slate-100 px-2 py-1 text-xs">Auto-detect</button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Le moteur choisit automatiquement une voix féminine compatible langue, puis fallback navigateur.</p>
        </section>

        <section className="mt-4 rounded-xl border p-3">
          <h3 className="text-sm font-semibold">Cadeaux</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {GIFTS.map((gift) => (
              <button key={gift.id} onClick={() => onSendGift(gift)} className="rounded border bg-rose-50 px-3 py-1 text-sm hover:bg-rose-100">
                {gift.icon} {gift.label} (+{gift.points})
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border p-3">
          <h3 className="text-sm font-semibold">Données</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={onSyncEmails} className="rounded bg-indigo-100 px-3 py-1 text-sm">Synchroniser emails</button>
            <button onClick={onExportUserData} className="rounded bg-emerald-100 px-3 py-1 text-sm">Exporter</button>
            <label className="cursor-pointer rounded bg-amber-100 px-3 py-1 text-sm">
              Importer
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const txt = await file.text();
                  onImportUserData(JSON.parse(txt));
                }}
              />
            </label>
            <button onClick={onClearConversation} className="rounded bg-red-100 px-3 py-1 text-sm">Vider conversation</button>
          </div>
        </section>

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="rounded bg-rose-600 px-4 py-2 text-sm text-white">Fermer</button>
        </div>
      </div>
    </div>
  );
}
