
import React, { useState, useEffect, useRef } from 'react';
import { Message, Speaker, Language, Emotion, AvatarState, UserProfile, VoiceSettings, Theme, InteractionMode, Gift, CalendarEvent, Alarm, Routine } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { generateLocalResponse } from './services/localAIService';
import { simpleLocalAI } from './services/simpleLocalAI';
import { coherentLocalAI } from './services/coherentLocalAI';
import { ollamaService } from './services/ollamaService';
import { speakText } from './services/speechService';
import { getThemeStyles } from './services/themeService';
import { fetchUnreadEmails } from './services/googleService';
import { expressionImageService } from './services/expressionImageService';
import Avatar from './components/Avatar';
import ChatControls from './components/ChatControls';
import ChatHistory from './components/ChatHistory';
import SettingsHub from './components/SettingsHub';
import LoadingScreen from './components/LoadingScreen';
import Logo from './components/Logo';
import ExpressionSettings from './components/ExpressionSettings';
import { Settings as SettingsIcon, Clock, Moon, Sun, ShieldCheck, Palette } from 'lucide-react';

const STORAGE_KEYS = {
    PROFILE: 'rem_idol_profile_v8',
    IMAGES: 'rem_idol_images_v3',
    SETTINGS: 'rem_idol_voice_v3',
    MESSAGES: 'rem_idol_messages_v1',
    AVATAR_STATE: 'rem_idol_avatar_state_v1'
};

const DEFAULT_PROFILE: UserProfile = {
    id: `user-${Date.now()}`,
    name: '',
    avatarName: 'Rem-san',
    birthDate: '',
    location: '',
    interests: [],
    personality: 'sweet',
    soulNature: 'Une âme dévouée, protectrice et attentive aux besoins de Pierre-sama.',
    soulEmoji: '🌸',
    customInstructions: '',
    friendshipLevel: 10,
    memories: [],
    coreMemories: [],
    traits: {},
    allowThoughtPeek: false,
    jpScript: 'katakana',
    calendar: [],
    alarms: [],
    routines: [],
    lastInteractionDate: '',
    hasGreetedToday: false,
    dailyInteractionCount: 0
};

const DEFAULT_VOICE: VoiceSettings = {
    enabled: true,
    pitch: 1.1, 
    rate: 1.0, // Retour à la vitesse normale
    elevenLabs: { enabled: false, apiKey: '', voiceId: '' },
    tiktok: { enabled: false, voiceId: 'fr_001' }
};

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
    const [messages, setMessages] = useState<Message[]>([]);
    const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(DEFAULT_VOICE);
    const [avatarState, setAvatarState] = useState<AvatarState>({ 
        isTalking: false, 
        emotion: Emotion.NORMAL_SMILE, 
        customImages: {},
        customModelFiles: [], 
        isNightMode: false 
    });
    const [isSpeaking, setIsSpeaking] = useState(false);

    const [input, setInput] = useState('');
    const [language, setLanguage] = useState<Language>(Language.FR);
    const [isAILoading, setIsAILoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isHubOpen, setIsHubOpen] = useState(false);
    const [isExpressionSettingsOpen, setIsExpressionSettingsOpen] = useState(false);
    const [chatFocus, setChatFocus] = useState(false);
    const [mode, setMode] = useState<InteractionMode>(InteractionMode.STANDARD);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [useLocalAI, setUseLocalAI] = useState(true); // true = IA locale, false = Gemini API
    
    const lastAlarmFiredRef = useRef<string | null>(null);
    const initialGreetingDone = useRef(false);
    const wakeLockRef = useRef<any>(null);

    const getExpressionInfoFromEmotion = (emotion: Emotion): { number: number; name: string } => {
        const map: Partial<Record<Emotion, { number: number; name: string }>> = {
            [Emotion.NEUTRAL]: { number: 2, name: 'Neutre / normale' },
            [Emotion.HAPPY]: { number: 3, name: 'Sourire joyeux' },
            [Emotion.SAD]: { number: 14, name: 'Tristesse' },
            [Emotion.SURPRISED]: { number: 7, name: 'Surprise douce' },
            [Emotion.CONFUSED]: { number: 12, name: 'Confusion / erreur' },
            [Emotion.ANGRY]: { number: 15, name: 'Colère' },
            [Emotion.LAUGH]: { number: 3, name: 'Sourire joyeux' },
            [Emotion.ATTENTIVE]: { number: 1, name: 'Attentive à ton écoute' },
            [Emotion.NORMAL_SMILE]: { number: 2, name: 'Neutre / normale' },
            [Emotion.JOYFUL_SMILE]: { number: 3, name: 'Sourire joyeux' },
            [Emotion.REFLECTIVE]: { number: 4, name: 'Réflexion' },
            [Emotion.WAITING]: { number: 5, name: 'En attente / en veille' },
            [Emotion.WELCOME]: { number: 6, name: 'Accroche / bienvenue' },
            [Emotion.SURPRISED_SOFT]: { number: 7, name: 'Surprise douce' },
            [Emotion.APPRECIATIVE]: { number: 8, name: 'Appréciation / contentement' },
            [Emotion.SERIOUS_FOCUSED]: { number: 9, name: 'Sérieuse / concentrée' },
            [Emotion.SLEEPY]: { number: 10, name: 'Fatiguée / endormie' },
            [Emotion.PROCESSING]: { number: 11, name: "Je traite l'information" },
            [Emotion.CONFUSION]: { number: 12, name: 'Confusion / erreur' },
            [Emotion.AFFIRMATION]: { number: 13, name: 'Affirmation / OK' },
            [Emotion.SADNESS]: { number: 14, name: 'Tristesse' },
            [Emotion.ANGER]: { number: 15, name: 'Colère' },
            [Emotion.POUTING_NEW]: { number: 16, name: 'Boudeuse' },
            [Emotion.DISGUST_NEW]: { number: 17, name: 'Dégoût / grimace' },
            [Emotion.FEAR_NEW]: { number: 18, name: 'Peur / effrayée' },
            [Emotion.AWKWARD]: { number: 19, name: 'Gênée / malaise doux' },
            [Emotion.SHOCKED_NEW]: { number: 20, name: 'Choquée' }
        };
        return map[emotion] || { number: 2, name: 'Neutre / normale' };
    };

    const hiraToKata = (input: string): string =>
        input.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));

    const kataToHira = (input: string): string =>
        input.replace(/[\u30A1-\u30F6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

    const extractBracketTranslation = (raw: string): { cleaned: string; extracted?: string } => {
        // Ex: "...\n[BONJOUR]" or "...[ merci ]" (latin only)
        const match = raw.match(/\[\s*([A-Za-zÀ-ÿ0-9\s'".,!?;:\-()]{2,})\s*\]\s*$/);
        if (!match) return { cleaned: raw };
        const extracted = match[1].trim();
        const cleaned = raw.replace(match[0], '').trim();
        return { cleaned, extracted };
    };

    const sanitizeJapaneseByScript = (raw: string, script: UserProfile['jpScript']): string => {
        const normalized = raw.replace(/[A-Za-zÀ-ÿ0-9]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
        const s = script || 'katakana';

        if (s === 'hiragana') {
            const hira = kataToHira(normalized);
            const only = hira
                .replace(/[^\u3040-\u309F\u3000\s。、！？ー・「」『』（）]/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            return only || '…';
        }

        if (s === 'katakana') {
            const kata = hiraToKata(normalized);
            const only = kata
                .replace(/[^\u30A0-\u30FF\u3000\s。、！？ー・「」『』（）]/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            return only || '…';
        }

        // kanji: keep kanji + kana, but drop latin
        const kana = normalized;
        const only = kana
            .replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\u3000\s。、！？ー・「」『』（）]/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
        return only || '…';
    };

    const normalizeJPMessage = (rawText: string, rawTranslation?: string): { text: string; translation?: string } => {
        const { cleaned, extracted } = extractBracketTranslation(rawText);
        const translation = rawTranslation || extracted;
        const text = sanitizeJapaneseByScript(cleaned, userProfile.jpScript);

        const jpFallback = (script: UserProfile['jpScript']) => {
            const s = script || 'katakana';
            if (s === 'hiragana') return 'うん。きいてる。';
            if (s === 'kanji') return 'うん。聞いてる。';
            return 'ウン。キイテル。';
        };

        const compact = text.replace(/[\s\u3000]/g, '');
        if (text === '…' || compact.length < 2) {
            const fallbackText = jpFallback(userProfile.jpScript);
            const fallbackTranslation = (translation || cleaned || '').trim();
            return {
                text: fallbackText,
                translation: fallbackTranslation ? fallbackTranslation : undefined
            };
        }

        return { text, translation };
    };

    useEffect(() => {
        const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
        const savedVoice = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        const savedImages = localStorage.getItem(STORAGE_KEYS.IMAGES);
        const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
        const savedAvatarState = localStorage.getItem(STORAGE_KEYS.AVATAR_STATE);

        let profile = DEFAULT_PROFILE;
        if (savedProfile) {
            try {
                const parsed = JSON.parse(savedProfile);
                profile = { ...DEFAULT_PROFILE, ...parsed };
            } catch (e) { console.error(e); }
        }
        setUserProfile(profile);
        
        if (savedVoice) try { setVoiceSettings({ ...DEFAULT_VOICE, ...JSON.parse(savedVoice) }); } catch(e){}
        if (savedImages) {
            try {
                const parsedImages = JSON.parse(savedImages);
                const imagesMap = (parsedImages && typeof parsedImages === 'object' && !Array.isArray(parsedImages))
                    ? parsedImages
                    : {};
                setAvatarState(prev => ({ ...prev, customImages: imagesMap }));
            } catch (e) {
                console.error(e);
            }
        }
        if (savedAvatarState) {
            try {
                const parsedState = JSON.parse(savedAvatarState);
                if (typeof parsedState === 'object' && typeof parsedState.isNightMode === 'boolean') {
                    setAvatarState(prev => ({ ...prev, isNightMode: parsedState.isNightMode }));
                }
            } catch (e) {
                console.error(e);
            }
        }

        let hasHistory = false;
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                if (Array.isArray(parsed)) {
                    const safe = parsed
                        .filter(m => m && typeof m === 'object' && typeof m.id === 'string' && typeof m.text === 'string')
                        .slice(-200);
                    if (safe.length) {
                        hasHistory = true;
                        setMessages(safe);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            checkAlarms(now);
        }, 1000);
        
        const handleVisibilityChange = () => {
            if (wakeLockRef.current !== null && document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        setTimeout(() => {
            setIsAppLoading(false);
            if (!hasHistory) handleProactiveGreeting(profile);
        }, 1200);

        return () => {
            clearInterval(timer);
            releaseWakeLock();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages.slice(-200)));
        } catch (e) {
            console.error(e);
        }
    }, [messages]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.AVATAR_STATE, JSON.stringify({ isNightMode: avatarState.isNightMode }));
        } catch (e) {
            console.error(e);
        }
    }, [avatarState.isNightMode]);

    const clearConversation = () => {
        setMessages([]);
        try {
            localStorage.removeItem(STORAGE_KEYS.MESSAGES);
        } catch (e) {
            console.error(e);
        }
    };

    const exportUserData = () => {
        const payload = {
            version: 1,
            exportedAt: Date.now(),
            profile: userProfile,
            settings: voiceSettings,
            images: avatarState.customImages || {},
            messages
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rem-idol-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importUserData = (data: any) => {
        const hasEnvelope = data && typeof data === 'object' && ('profile' in data || 'settings' in data || 'messages' in data || 'images' in data);
        const profileData = hasEnvelope ? data.profile : data;
        const settingsData = hasEnvelope ? data.settings : undefined;
        const imagesData = hasEnvelope ? data.images : undefined;
        const messagesData = hasEnvelope ? data.messages : undefined;

        if (profileData && typeof profileData === 'object') {
            const nextProfile: UserProfile = {
                ...DEFAULT_PROFILE,
                ...userProfile,
                ...profileData,
                interests: Array.isArray(profileData.interests) ? profileData.interests : (userProfile.interests || []),
                memories: Array.isArray(profileData.memories) ? profileData.memories : (userProfile.memories || []),
                calendar: Array.isArray(profileData.calendar) ? profileData.calendar : (userProfile.calendar || []),
                alarms: Array.isArray(profileData.alarms) ? profileData.alarms : (userProfile.alarms || []),
                routines: Array.isArray(profileData.routines) ? profileData.routines : (userProfile.routines || [])
            };
            setUserProfile(nextProfile);
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(nextProfile));
        }

        if (settingsData && typeof settingsData === 'object') {
            const nextSettings: VoiceSettings = { ...DEFAULT_VOICE, ...voiceSettings, ...settingsData };
            setVoiceSettings(nextSettings);
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(nextSettings));
        }

        if (imagesData && typeof imagesData === 'object' && !Array.isArray(imagesData)) {
            setAvatarState(prev => ({ ...prev, customImages: imagesData }));
            localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(imagesData));
        }

        if (Array.isArray(messagesData)) {
            const safe = messagesData
                .filter(m => m && typeof m === 'object' && typeof m.id === 'string' && typeof m.text === 'string')
                .slice(-200);
            setMessages(safe);
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(safe));
        }
    };

    const requestWakeLock = async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
            } catch (err) { console.error(err); }
        }
    };

    const releaseWakeLock = () => {
        if (wakeLockRef.current) {
            wakeLockRef.current.release().then(() => {
                wakeLockRef.current = null;
            });
        }
    };

    const toggleNightMode = () => {
        console.log('toggleNightMode clicked, current isNightMode:', avatarState.isNightMode);
        const newNightMode = !avatarState.isNightMode;
        console.log('Setting newNightMode to:', newNightMode);
        if (newNightMode) {
            requestWakeLock();
            setAvatarState(prev => ({ ...prev, isNightMode: true, emotion: Emotion.SLEEP }));
            const silent = new SpeechSynthesisUtterance("");
            window.speechSynthesis.speak(silent);
        } else {
            releaseWakeLock();
            setAvatarState(prev => ({ ...prev, isNightMode: false, emotion: Emotion.HAPPY }));
        }
    };

    const checkAlarms = (now: Date) => {
        const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const activeAlarm = userProfile.alarms?.find(a => a.isEnabled && a.time === timeStr);
        if (activeAlarm && lastAlarmFiredRef.current !== timeStr) {
            lastAlarmFiredRef.current = timeStr;
            triggerAlarm(activeAlarm);
        }
        if (lastAlarmFiredRef.current && lastAlarmFiredRef.current !== timeStr) {
            lastAlarmFiredRef.current = null;
        }
    };

    const triggerAlarm = async (alarm: Alarm) => {
        if (avatarState.isNightMode) {
            setAvatarState(prev => ({ ...prev, isNightMode: false, emotion: Emotion.LAUGH }));
            releaseWakeLock();
        }
        const wakeupText = `Bonjour ${userProfile.name || 'mon maître'} ! Il est ${alarm.time}, c'est l'heure : ${alarm.label}. ${userProfile.avatarName} est là pour toi !`;
        const wakeupJPBase = `おはよう！きょうも いっしょに がんばろう。`;
        const alarmJP = normalizeJPMessage(wakeupJPBase);
        const alarmText = language === Language.JP ? alarmJP.text : wakeupText;
        const alarmEmotion = Emotion.LAUGH;
        const alarmExpr = getExpressionInfoFromEmotion(alarmEmotion);
        setMessages(prev => [...prev, {
            id: `alarm-${Date.now()}`,
            text: alarmText,
            speaker: Speaker.AI,
            timestamp: Date.now(),
            emotion: alarmEmotion,
            translation: language === Language.JP ? (alarmJP.translation || wakeupText) : undefined,
            expressionNumber: alarmExpr.number,
            expressionName: expressionImageService.getName(alarmExpr.number) || alarmExpr.name
        }]);
        await handleSpeak(alarmText);
    };

    const handleSpeak = async (text: string) => {
        console.log('🔊 handleSpeak called:', { text, isSpeaking, voiceEnabled: voiceSettings.enabled });
        if (isSpeaking || !voiceSettings.enabled) {
            console.log('❌ Speech blocked:', { isSpeaking, voiceEnabled: voiceSettings.enabled });
            return;
        }
        setIsSpeaking(true);
        try {
            await speakText(text, language, voiceSettings, () => setAvatarState(prev => ({ ...prev, isTalking: true })), () => setAvatarState(prev => ({ ...prev, isTalking: false })));
            console.log('✅ Speech completed');
        } catch (error) {
            console.error('❌ Speech error:', error);
        } finally {
            setIsSpeaking(false);
        }
    };

    const handleSend = async (overrideText?: string, giftValue: number = 0) => {
        const messageText = overrideText || input.trim();
        if (!messageText) return;

        // Ajouter le message de l'utilisateur
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: messageText,
            speaker: Speaker.USER,
            timestamp: Date.now(),
            emotion: Emotion.NORMAL_SMILE
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsAILoading(true);
        setChatFocus(false);

        try {
            let res;
            console.log('🔍 handleSend called with:', { messageText, language, useLocalAI });
            
            // Utiliser l'IA locale ou Gemini API selon le paramètre
            if (useLocalAI) {
                try {
                    res = await ollamaService.generateResponse(messageText, userProfile, language);
                    console.log('✅ Réponse générée par Ollama:', res);
                } catch (error) {
                    console.log('❌ Ollama indisponible, fallback vers IA cohérente:', error);
                    res = coherentLocalAI.generateResponse(messageText, userProfile, language);
                    console.log('🔄 Réponse fallback IA cohérente:', res);
                }
            } else {
                res = await sendMessageToGemini(messageText, language, userProfile);
                console.log('✅ Réponse générée par Gemini:', res);
            }
            
            // Ajouter la réponse de l'IA
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                text: res.text,
                speaker: Speaker.AI,
                timestamp: Date.now(),
                emotion: res.emotion,
                translation: (res as any).translation,
                thought: (res as any).thought
            };
            
            // Ajouter le message avec expression
            const fallbackExpr = getExpressionInfoFromEmotion(res.emotion);
            const expressionNumber = (res as any).expressionNumber ?? fallbackExpr.number;
            const expressionName = (res as any).expressionName ?? (expressionImageService.getName(expressionNumber) || fallbackExpr.name);
            const jpNorm = language === Language.JP ? normalizeJPMessage(res.text, (res as any).translation) : undefined;
            const finalAiText = language === Language.JP ? jpNorm!.text : res.text;
            const messageWithExpression = {
                ...aiMessage,
                text: finalAiText,
                translation: language === Language.JP ? jpNorm!.translation : (aiMessage as any).translation,
                expressionNumber,
                expressionName
            };
            
            setMessages(prev => [...prev, messageWithExpression]);
            setAvatarState(prev => ({ ...prev, emotion: res.emotion }));
            handleSpeak(finalAiText);
            
            // Gérer la mémoire et l'amitié
            if ((res as any).newMemory || (res as any).newCoreMemory || (res as any).traitDeltas || res.friendshipChange) {
                const updatedProfile = { ...userProfile };
                if ((res as any).newMemory) {
                    updatedProfile.memories = [...(updatedProfile.memories || []), (res as any).newMemory];
                }
                if ((res as any).newCoreMemory) {
                    updatedProfile.coreMemories = [...(updatedProfile.coreMemories || []), (res as any).newCoreMemory];
                }
                if ((res as any).traitDeltas && Array.isArray((res as any).traitDeltas)) {
                    const currentTraits = { ...(updatedProfile.traits || {}) };
                    for (const td of (res as any).traitDeltas) {
                        if (!td || !td.name) continue;
                        const prev = typeof currentTraits[td.name] === 'number' ? currentTraits[td.name] : 0;
                        const next = Math.max(0, Math.min(100, prev + (Number(td.delta) || 0)));
                        currentTraits[td.name] = next;
                    }
                    updatedProfile.traits = currentTraits;
                }
                if (res.friendshipChange) {
                    updatedProfile.friendshipLevel = Math.min(100, Math.max(0, updatedProfile.friendshipLevel + res.friendshipChange));
                }
                setUserProfile(updatedProfile);
                localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
            }
            
            // Synthèse vocale
            handleSpeak(res.text);
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: useLocalAI 
                    ? "Désolée Pierre-sama, j'ai eu un petit problème de traitement... Réessaye encore une fois."
                    : "Désolée Pierre-sama, mon âme s'est troublée un instant... Je suis de nouveau à ton écoute.",
                speaker: Speaker.AI,
                timestamp: Date.now(),
                emotion: Emotion.SADNESS
            };
            setMessages(prev => [...prev, errorMessage]);
            setAvatarState(prev => ({ ...prev, emotion: Emotion.SADNESS }));
        } finally {
            setIsAILoading(false);
        }
    };

    const handleProactiveGreeting = async (profile: UserProfile) => {
        if (initialGreetingDone.current) return;
        initialGreetingDone.current = true;
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        
        let greetingType = "[SYSTEM: GREETING]";
        if (profile.birthDate) {
            const birth = new Date(profile.birthDate);
            if (birth.getMonth() === now.getMonth() && birth.getDate() === now.getDate()) {
                greetingType = "[SYSTEM: BIRTHDAY_GREETING]";
            }
        }

        if (profile.lastInteractionDate !== todayStr) {
            let res;
            
            // Utiliser l'IA locale ou Gemini API selon le paramètre
            if (useLocalAI) {
                try {
                    res = await ollamaService.generateResponse(greetingType, profile, language);
                    console.log('✅ Salutation générée par Ollama');
                } catch (error) {
                    console.log('❌ Ollama indisponible, fallback vers IA cohérente');
                    res = coherentLocalAI.generateResponse(greetingType, profile, language);
                }
            } else {
                res = await sendMessageToGemini(greetingType, language, profile);
            }
            
            const greetExpr = getExpressionInfoFromEmotion(res.emotion);
            const greetExpressionNumber = (res as any).expressionNumber ?? greetExpr.number;
            const greetExpressionName = (res as any).expressionName ?? (expressionImageService.getName(greetExpressionNumber) || greetExpr.name);
            const greetJP = language === Language.JP ? normalizeJPMessage(res.text, (res as any).translation) : undefined;
            const greetText = language === Language.JP ? greetJP!.text : res.text;
            setMessages(prev => [...prev, {
                id: `greet-${Date.now()}`,
                text: greetText,
                speaker: Speaker.AI,
                timestamp: Date.now(),
                emotion: res.emotion,
                translation: language === Language.JP ? greetJP!.translation : (res as any).translation,
                thought: (res as any).thought,
                expressionNumber: greetExpressionNumber,
                expressionName: greetExpressionName
            }]);
            setAvatarState(prev => ({ ...prev, emotion: res.emotion }));
            handleSpeak(greetText);
            
            const updatedProfile = { ...profile, lastInteractionDate: todayStr };
            setUserProfile(updatedProfile);
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === Language.FR ? Language.JP : Language.FR);
    };

    const toggleMode = () => {
        setMode(prev => prev === InteractionMode.STANDARD ? InteractionMode.CONTINUOUS : InteractionMode.STANDARD);
    };

    const toggleChatFocus = () => {
        setChatFocus(prev => !prev);
    };

    const toggleListening = () => {
        setIsListening(prev => !prev);
    };

    if (isAppLoading) return <LoadingScreen theme={Theme.SOFT_PINK} />;

    const themeStyles = getThemeStyles(Theme.SOFT_PINK);
    const formattedTime = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`relative w-full h-screen overflow-hidden flex flex-col transition-all duration-1000 ${avatarState.isNightMode ? 'bg-black' : themeStyles.container}`}>
            {avatarState.isNightMode && (
                <div className="absolute inset-0 z-[80] flex flex-col items-center justify-center">
                    <div className="absolute top-8 text-center space-y-2">
                        <div className="text-6xl font-display font-black text-white/20 tracking-tighter tabular-nums select-none">{formattedTime}</div>
                        <div className="flex items-center justify-center gap-2 text-white/10 uppercase font-black text-[9px] tracking-[0.4em]"><ShieldCheck size={12} /> Veille Active</div>
                    </div>
                    
                    {/* Avatar en mode nuit */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Avatar
                            state={avatarState}
                            isAvatarOnlyView={true}
                        />
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Quit night mode button clicked directly!');
                            toggleNightMode();
                        }}
                        className="absolute bottom-12 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/30 font-black uppercase text-[9px] tracking-widest hover:bg-white/10 transition-all pointer-events-auto z-[90]"
                        title="Quitter le mode nuit"
                    >
                        Quitter le Mode Nuit
                    </button>
                </div>
            )}

            {!avatarState.isNightMode && (
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-[70]">
                    <div className={`flex items-center gap-3 p-2 px-4 rounded-full backdrop-blur-md border ${themeStyles.glass}`}>
                        <div className="text-xl">{userProfile.soulEmoji}</div>
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-display font-black tracking-tighter uppercase leading-none ${themeStyles.textPrimary}`}>{userProfile.avatarName}</span>
                            <div className={`flex items-center gap-1 text-[9px] font-bold ${themeStyles.textSecondary} mt-0.5`}><Clock size={10} /> {formattedTime}</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Moon button clicked directly!');
                            toggleNightMode();
                        }}
                        className="p-3 rounded-full bg-indigo-900 text-indigo-200 shadow-xl border border-indigo-700/50 hover:bg-indigo-800 transition-all active:scale-90"
                        title="Activer le mode nuit"
                    >
                        <Moon size={24} />
                    </button>
                    <button 
                        onClick={() => setIsHubOpen(true)} 
                        className={`p-3 rounded-full shadow-lg ${themeStyles.buttonPrimary}`}
                        title="Ouvrir les paramètres"
                    >
                        <SettingsIcon size={24} />
                    </button>
                    </div>
                </div>
            )}

            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${chatFocus ? 'opacity-10 blur-2xl scale-90' : 'opacity-100 scale-100'}`}>
                <Avatar 
                    state={avatarState} 
                    isAvatarOnlyView={!chatFocus}
                />
            </div>

            {!avatarState.isNightMode && (
                <>
                    <div className="flex-1 relative z-50 flex flex-col justify-end overflow-hidden">
                        <ChatHistory
                            messages={messages}
                            theme={Theme.SOFT_PINK}
                            onFocus={() => setChatFocus(true)}
                            isFocused={chatFocus}
                            isLoading={isAILoading}
                            allowThoughtPeek={userProfile.allowThoughtPeek}
                        />
                    </div>
                    <div className="relative w-full z-[60] pb-6 px-4">
                        <ChatControls
                            input={input}
                            setInput={setInput}
                            onSend={() => handleSend()}
                            isListening={isListening}
                            toggleListening={toggleListening}
                            language={language}
                            toggleLanguage={toggleLanguage}
                            isChatFocused={chatFocus}
                            toggleChatFocus={toggleChatFocus}
                            isLoading={isAILoading}
                            mode={mode}
                            toggleMode={toggleMode}
                            theme={Theme.SOFT_PINK}
                            avatarName={userProfile.avatarName}
                        />
                    </div>
                </>
            )}

            <SettingsHub 
                isOpen={isHubOpen} onClose={() => setIsHubOpen(false)} 
                settings={voiceSettings} onUpdateSettings={(s) => { setVoiceSettings(s); localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(s)); }} 
                profile={userProfile} onUpdateProfile={(p) => { setUserProfile(p); localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(p)); }} 
                currentEmotion={avatarState.emotion} onUpdateEmotion={(e) => setAvatarState(prev => ({ ...prev, emotion: e }))}
                customImages={avatarState.customImages || {}}
                onUpdateCustomImage={async (id, file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64 = e.target?.result as string;
                        setAvatarState(prev => {
                            const next = { ...(prev.customImages || {}), [id]: base64 };
                            localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(next));
                            return { ...prev, customImages: next };
                        });
                    };
                    reader.readAsDataURL(file);
                }}
                onSendGift={(gift) => handleSend(`[GREETING: ${typeof gift === 'string' ? gift : gift.name}]`, typeof gift === 'string' ? 5 : gift.points)}
                onSyncEmails={() => {}}
                onClearConversation={clearConversation}
                onExportUserData={exportUserData}
                onImportUserData={importUserData}
            />
        </div>
    );
}
