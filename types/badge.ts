// types/badge.ts
export type BadgeCategory = 'technical' | 'social' | 'achievement';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // Pode ser um nome de ícone ou caminho para uma imagem
    category: BadgeCategory;
    pointsRequired?: number; // Alguns badges podem não ser baseados em pontos
    condition: string; // Uma chave ou descrição da condição para ganhar (ex: 'complete_10_challenges')
    isActive: boolean; // Para controlar se um badge pode ser ganho
    createdAt: Date;
}