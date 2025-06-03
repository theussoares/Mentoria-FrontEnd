// utils/helpers.ts

/**
 * Formata um objeto Date para uma string no formato dd/MM/yyyy.
 * @param dateInput - O objeto Date, string de data ou timestamp a ser formatado.
 * @returns A data formatada como string, ou uma string vazia se a data for inválida.
 */
export const formatDate = (dateInput: Date | string | number | null | undefined): string => {
    if (!dateInput) {
        return '';
    }

    try {
        const date = new Date(dateInput);

        // Verifica se a data é válida após a conversão
        if (isNaN(date.getTime())) {
            console.warn('Data inválida fornecida para formatDate:', dateInput);
            return '';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexados
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error, 'Input:', dateInput);
        return ''; // Retorna string vazia em caso de erro na conversão
    }
};

/**
 * Formata um objeto Date para uma string no formato dd/MM/yyyy HH:mm.
 * @param dateInput - O objeto Date, string de data ou timestamp a ser formatado.
 * @returns A data e hora formatadas como string, ou uma string vazia se a data for inválida.
 */
export const formatDateTime = (dateInput: Date | string | number | null | undefined): string => {
    if (!dateInput) {
        return '';
    }

    try {
        const date = new Date(dateInput);

        if (isNaN(date.getTime())) {
            console.warn('Data inválida fornecida para formatDateTime:', dateInput);
            return '';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error('Erro ao formatar data e hora:', error, 'Input:', dateInput);
        return '';
    }
};

// Outras funções helper podem ser adicionadas aqui conforme necessário.
  // Ex: capitalizarPrimeiraLetra, calcularProgresso, etc.