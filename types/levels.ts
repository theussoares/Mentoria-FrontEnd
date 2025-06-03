// types/level.ts
import type { TechnologyCategory } from './challenge'; // Importando se necessário

export interface Level {
    id: string;
    name: string;
    technology: TechnologyCategory | 'general'; // Pode ser específico de uma tecnologia ou geral
    pointsRequired: number;
    order: number; // Para ordenação dos níveis
    color: string; // Cor associada ao nível, como nas suas constantes
    description: string;
}