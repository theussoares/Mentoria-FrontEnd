// utils/constants.ts
export const LEVELS = {
    HTML: [
        { name: 'HTML Iniciante', points: 0, color: '#e74c3c' },
        { name: 'HTML Construtor', points: 100, color: '#e67e22' },
        { name: 'HTML Arquiteto', points: 250, color: '#f39c12' }
    ],
    CSS: [
        { name: 'CSS Estilista', points: 350, color: '#2ecc71' },
        { name: 'CSS Designer', points: 500, color: '#27ae60' },
        { name: 'CSS Mestre Visual', points: 700, color: '#16a085' }
    ],
    JAVASCRIPT: [
        { name: 'JS Programador', points: 900, color: '#3498db' },
        { name: 'JS Desenvolvedor', points: 1200, color: '#2980b9' },
        { name: 'JS Ninja do Código', points: 1600, color: '#8e44ad' }
    ]
}

export const BADGES = {
    // Técnicos
    FIRST_SITE: { name: 'Primeiro Site', icon: '🏗️', points: 50 },
    STYLIST: { name: 'Estilista', icon: '🎨', points: 150 },
    INTERACTIVE: { name: 'Interativo', icon: '⚡', points: 300 },
    RESPONSIVE: { name: 'Responsivo', icon: '📱', points: 400 },
    DEBUGGER: { name: 'Debugger', icon: '🐛', condition: 'fix_10_bugs' },
    DEPLOY_MASTER: { name: 'Deploy Master', icon: '🚀', condition: 'deploy_5_sites' },

    // Sociais
    MENTOR: { name: 'Mentor', icon: '👥', condition: 'help_5_students' },
    COMMUNICATIVE: { name: 'Comunicativo', icon: '💬', condition: 'attend_all_classes' },
    PUNCTUAL: { name: 'Pontual', icon: '⏰', condition: 'never_late' },
    FOCUSED: { name: 'Focado', icon: '🎯', condition: 'complete_all_exercises' }
}