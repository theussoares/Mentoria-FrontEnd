// utils/validators.ts

/**
 * Verifica se uma string possui um formato de e-mail básico.
 * @param email - O e-mail a ser validado.
 * @returns True se o formato for válido, false caso contrário.
 */
export const isValidEmailFormat = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

/**
 * Verifica se uma string não está vazia (após trim).
 * @param value - O valor da string.
 * @returns True se não estiver vazia, false caso contrário.
 */
export const isNotEmpty = (value: string | null | undefined): boolean => {
    if (value === null || value === undefined) return false;
    return String(value).trim().length > 0;
};

/**
 * Verifica se uma string atinge um comprimento mínimo.
 * @param value - O valor da string.
 * @param minLength - O comprimento mínimo requerido.
 * @returns True se o comprimento for atingido, false caso contrário.
 */
export const isMinimumLength = (value: string | null | undefined, minLength: number): boolean => {
    if (value === null || value === undefined) return false;
    return String(value).length >= minLength;
};

/**
 * Validador para senhas, verificando um comprimento mínimo.
 * Poderia ser expandido para verificar complexidade (maiúsculas, números, etc.).
 * @param password - A senha a ser validada.
 * @returns True se a senha for válida, uma string com a mensagem de erro caso contrário.
 */
export const validatePassword = (password: string): true | string => {
    if (!isNotEmpty(password)) {
        return 'O campo de senha é obrigatório.';
    }
    if (!isMinimumLength(password, 6)) { // Exemplo: mínimo de 6 caracteres
        return 'A senha deve ter pelo menos 6 caracteres.';
    }
    // Outras validações de senha podem ser adicionadas aqui
    // Ex: verificar se contém letras maiúsculas, minúsculas, números, símbolos.
    return true;
};

// Podemos adicionar mais validadores conforme a necessidade do projeto.
  // Ex: validador de números, URLs, etc.