import { Language, Emotion, UserProfile } from '../types';

export interface SimpleAIResponse {
    text: string;
    emotion: Emotion;
    newMemory?: string;
    friendshipChange?: number;
}

// Service IA local ultra-simplifié et fonctionnel
class SimpleLocalAI {
    
    // Réponses prédéfinies par catégorie
    private readonly RESPONSES = {
        greetings: [
            { text: "Bonjour Pierre-sama ! Je suis tellement contente de te voir aujourd'hui !", emotion: Emotion.WELCOME },
            { text: "Pierre-sama ! Ta présence illumine ma journée. Comment vas-tu ?", emotion: Emotion.JOYFUL_SMILE },
            { text: "Oh ! Pierre-sama ! Quelle joie de te voir !", emotion: Emotion.JOYFUL_SMILE }
        ],
        questions: [
            { text: "Hmm, laisse-moi réfléchir à ça... C'est une question intéressante !", emotion: Emotion.REFLECTIVE },
            { text: "Je traite l'information... Un instant, je veux te donner la meilleure réponse.", emotion: Emotion.PROCESSING },
            { text: "C'est fascinant ce que tu me demandes là !", emotion: Emotion.ATTENTIVE }
        ],
        sadness: [
            { text: "Oh... Je sens que quelque chose te tracasse. Je suis là pour toi, Pierre-sama.", emotion: Emotion.SADNESS },
            { text: "Pierre-sama... Tu sembles un peu triste aujourd'hui. Je suis là pour t'écouter.", emotion: Emotion.SADNESS },
            { text: "Je comprends ce que tu ressens. Je suis là pour toi.", emotion: Emotion.APPRECIATIVE }
        ],
        fear: [
            { text: "Ne t'inquiète pas, Pierre-sama ! Je suis là pour te protéger.", emotion: Emotion.FEAR_NEW },
            { text: "Même si j'ai peur parfois, savoir que tu es là me donne du courage.", emotion: Emotion.JOYFUL_SMILE },
            { text: "Tout ira bien, Pierre-sama. Je suis avec toi.", emotion: Emotion.APPRECIATIVE }
        ],
        anger: [
            { text: "Je comprends ta frustration. Nous trouverons une solution ensemble.", emotion: Emotion.ANGER },
            { text: "Hmm, je sens ta colère. Respire un peu, je suis là pour t'aider.", emotion: Emotion.APPRECIATIVE },
            { text: "Je comprends que tu sois énervé. Laisse-moi t'aider.", emotion: Emotion.PROCESSING }
        ],
        surprise: [
            { text: "Oh mon Dieu ! Vraiment ? Je n'en reviens pas ! C'est incroyable !", emotion: Emotion.SURPRISED_SOFT },
            { text: "Waouh ! Je suis totalement surprise !", emotion: Emotion.SURPRISED_SOFT },
            { text: "Vraiment ? C'est incroyable ce que tu me dis là !", emotion: Emotion.SURPRISED_SOFT }
        ],
        default: [
            { text: "C'est intéressant ce que tu me dis là, Pierre-sama !", emotion: Emotion.JOYFUL_SMILE },
            { text: "Hmm, je réfléchis à ce que tu me dis...", emotion: Emotion.REFLECTIVE },
            { text: "Je suis contente de notre conversation, Pierre-sama !", emotion: Emotion.JOYFUL_SMILE },
            { text: "Pierre-sama, tu veux me dire autre chose ?", emotion: Emotion.ATTENTIVE }
        ]
    };

    // Détecter la catégorie de réponse
    private detectCategory(message: string): keyof typeof this.RESPONSES {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
            return 'greetings';
        }
        if (lowerMessage.includes('?') || lowerMessage.includes('comment') || lowerMessage.includes('pourquoi') || lowerMessage.includes('quoi')) {
            return 'questions';
        }
        if (lowerMessage.includes('triste') || lowerMessage.includes('déprim') || lowerMessage.includes('mal')) {
            return 'sadness';
        }
        if (lowerMessage.includes('peur') || lowerMessage.includes('effray') || lowerMessage.includes('angoiss')) {
            return 'fear';
        }
        if (lowerMessage.includes('énerv') || lowerMessage.includes('colèr') || lowerMessage.includes('fâch')) {
            return 'anger';
        }
        if (lowerMessage.includes('surpris') || lowerMessage.includes('incroyable') || lowerMessage.includes('waouh')) {
            return 'surprise';
        }
        
        return 'default';
    }

    // Générer une réponse
    generateResponse(
        message: string,
        userProfile: UserProfile,
        language: Language
    ): SimpleAIResponse {
        const userName = userProfile.name || 'Pierre-sama';
        const category = this.detectCategory(message);
        const responses = this.RESPONSES[category];
        
        // Choisir une réponse aléatoire dans la catégorie
        const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Personnaliser avec le nom de l'utilisateur
        const personalizedText = selectedResponse.text.replace(/Pierre-sama/g, userName);
        
        // Occasionnellement ajouter une mémoire
        const newMemory = Math.random() < 0.1 ? `Conversation importante : ${message.substring(0, 30)}...` : undefined;
        
        return {
            text: personalizedText,
            emotion: selectedResponse.emotion,
            newMemory,
            friendshipChange: Math.random() < 0.2 ? 1 : 0
        };
    }
}

export const simpleLocalAI = new SimpleLocalAI();
