
export enum Language {
    FR = 'fr-FR',
    JP = 'ja-JP'
}

export enum Speaker {
    USER = 'user',
    AI = 'ai'
}

export enum Emotion {
    NEUTRAL = 'neutral',
    HAPPY = 'happy',
    SAD = 'sad',
    ANGRY = 'angry',
    THINKING = 'thinking',
    WINK = 'wink',
    MISCHIEVOUS = 'mischievous',
    SURPRISED = 'surprised',
    SLEEP = 'sleep',
    LAUGH = 'laugh',
    CONFUSED = 'confused',
    RELIEVED = 'relieved',
    POUTING = 'pouting',
    DISGUST = 'disgust',
    FEAR = 'fear',
    EMBARRASSED = 'embarrassed',
    SHOCKED = 'shocked',
    CONCENTRATED = 'concentrated',
    PROCESS = 'process',
    DANCE = 'dance',
    CRYING = 'crying',
    DISTRUST = 'distrust',
    SERIOUS = 'serious',
    INLOVE = 'inlove',
    TIRED = 'tired',
    DETERMINED = 'determined',
    BORED = 'bored',
    CONFIDENT = 'confident',
    SHY = 'shy',
    EXCITED = 'excited',
    // Nouvelles expressions avec illustrations
    ATTENTIVE = 'attentive',
    NORMAL_SMILE = 'normal_smile',
    JOYFUL_SMILE = 'joyful_smile',
    REFLECTIVE = 'reflective',
    WAITING = 'waiting',
    WELCOME = 'welcome',
    SURPRISED_SOFT = 'surprised_soft',
    APPRECIATIVE = 'appreciative',
    SERIOUS_FOCUSED = 'serious_focused',
    SLEEPY = 'sleepy',
    PROCESSING = 'processing',
    CONFUSION = 'confusion',
    AFFIRMATION = 'affirmation',
    SADNESS = 'sadness',
    ANGER = 'anger',
    POUTING_NEW = 'pouting_new',
    DISGUST_NEW = 'disgust_new',
    FEAR_NEW = 'fear_new',
    AWKWARD = 'awkward',
    SHOCKED_NEW = 'shocked_new'
}

export enum Theme {
    SOFT_PINK = 'soft_pink',
    OLED = 'oled',
    CYBERPUNK = 'cyberpunk',
    MINIMALIST = 'minimalist'
}

export enum InteractionMode {
    STANDARD = 'standard',
    CONTINUOUS = 'continuous'
}

export type JapaneseScript = 'hiragana' | 'katakana' | 'kanji';

export interface GroundingChunk {
    web?: {
        uri: string;
        title: string;
    };
    maps?: {
        uri: string;
        title: string;
    };
}

export interface CalendarEvent {
    id: string;
    title: string;
    date: string; 
    time: string; 
    isAIAgenda?: boolean;
}

export interface Alarm {
    id: string;
    time: string; 
    label: string;
    isEnabled: boolean;
}

export interface Routine {
    id: string;
    name: string;
    description: string;
    isEnabled: boolean;
    icon: string;
}

export interface Email {
    id: string;
    sender: string;
    subject: string;
    snippet: string;
    isImportant: boolean;
    date: string;
}

export interface UserProfile {
    id: string;
    name: string;
    avatarName: string; 
    birthDate: string; 
    location: string;
    backupEmail?: string;
    interests: string[];
    personality: 'sweet' | 'energetic' | 'tsundere' | 'calm' | 'custom';
    soulNature: string; // La nature personnalisée de l'âme
    soulEmoji: string;  // L'emoji qui représente son âme
    customInstructions?: string; 
    friendshipLevel: number;
    memories: string[];
    calendar: CalendarEvent[];
    alarms: Alarm[];
    routines: Routine[];
    lastInteractionDate?: string; 
    hasGreetedToday?: boolean;
    dailyInteractionCount?: number;
    traits?: Record<string, number>;
    coreMemories?: string[];
    allowThoughtPeek?: boolean;
    jpScript?: JapaneseScript;
}

export interface VoiceSettings {
    enabled: boolean;
    pitch: number;
    rate: number;
    voiceName?: string; // Nom de la voix système préférée
    elevenLabs: { enabled: boolean; apiKey: string; voiceId: string; };
    tiktok: { enabled: boolean; voiceId: string; };
}

export interface Gift {
    id: string;
    name: string;
    icon: string;
    points: number;
    label: string;
}

export interface WeatherData {
    temperature: string;
    location: string;
    description: string;
    condition: string;
}

export interface TraitDelta {
    name: string;
    delta: number;
}

export interface Message {
    id: string;
    text: string;
    speaker: Speaker;
    timestamp: number;
    emotion?: Emotion;
    translation?: string;
    thought?: string;
    grounding?: GroundingChunk[];
    weather?: WeatherData;
    expressionNumber?: number;
    expressionName?: string;
}

export interface Point {
    x: number;
    y: number;
}

export interface AvatarState {
    isTalking: boolean;
    emotion: Emotion;
    customImages?: Record<number, string>;
    customModelFiles?: File[];
    isNightMode?: boolean;
}
