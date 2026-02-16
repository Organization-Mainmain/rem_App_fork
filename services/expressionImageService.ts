const EXPRESSION_NAMES: Record<number, string> = {
  1: 'Attentive à ton écoute',
  2: 'Neutre / normale',
  3: 'Sourire joyeux',
  4: 'Réflexion',
  5: 'En attente / en veille',
  6: 'Accroche / bienvenue',
  7: 'Surprise douce'
};

export const expressionImageService = {
  getName(id: number): string | undefined {
    return EXPRESSION_NAMES[id];
  }
};
