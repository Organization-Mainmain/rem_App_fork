import type { Email } from '../types';

export async function fetchUnreadEmails(): Promise<Email[]> {
  return [
    {
      id: 'demo-1',
      sender: 'support@example.com',
      subject: 'Bienvenue sur Rem App',
      snippet: 'Configuration terminée, tout est prêt.',
      isImportant: true,
      date: new Date().toISOString()
    }
  ];
}
