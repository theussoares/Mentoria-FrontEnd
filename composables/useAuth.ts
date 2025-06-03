// composables/useAuth.ts
import { ref } from 'vue';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,       // Já estava importado
  // GithubAuthProvider,    // Comentado
  signInWithPopup,          // Nova importação
  getAdditionalUserInfo,    // Nova importação
  type UserCredential,
  type AuthError
} from 'firebase/auth';
import { auth } from '~/utils/firebase'; // Ajuste o caminho se necessário

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string; // Pode vir diretamente do Google
  provider: 'email' | 'google' | 'github';
  isNewUser?: boolean;
}

export const useAuth = () => {
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Login com Email/Senha (implementado anteriormente)
  const loginWithEmail = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      user.value = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || '/img/default-avatar.png',
        provider: 'email',
      };
    } catch (e: any) {
      const authError = e as AuthError;
      console.error("Firebase Auth Error Details (loginWithEmail):", authError);
      switch (authError.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          error.value = 'E-mail ou senha inválidos. Verifique suas credenciais.';
          break;
        case 'auth/invalid-email':
          error.value = 'O formato do e-mail fornecido é inválido.';
          break;
        case 'auth/user-disabled':
          error.value = 'Este usuário foi desabilitado.';
          break;
        case 'auth/too-many-requests':
          error.value = 'Acesso bloqueado devido a muitas tentativas. Tente novamente mais tarde.';
          break;
        default:
          console.error("Unhandled Firebase Auth Error Code (loginWithEmail):", authError.code);
          error.value = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
      }
    } finally {
      loading.value = false;
    }
  };

  // Registro com Email/Senha (a ser implementado)
  const registerWithEmail = async (email: string, password: string, name: string) => { /* ... */ };

  // Login com Google
  const loginWithGoogle = async () => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      user.value = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || '/img/default-avatar.png', // Google geralmente fornece photoURL
        provider: 'google',
        isNewUser: additionalUserInfo?.isNewUser || false,
      };

      // Opcional: Se for um novo usuário, você pode querer salvar informações adicionais no Firestore aqui.
      // if (additionalUserInfo?.isNewUser) {
      //   // Lógica para criar um novo documento de estudante no Firestore
      // }

    } catch (e: any) {
      const authError = e as AuthError;
      console.error("Firebase Auth Error Details (loginWithGoogle):", authError);
      switch (authError.code) {
        case 'auth/popup-closed-by-user':
          error.value = 'O pop-up de login foi fechado antes da conclusão.';
          break;
        case 'auth/account-exists-with-different-credential':
          error.value = 'Já existe uma conta com este e-mail, mas com um método de login diferente.';
          // Você pode querer fornecer uma forma de vincular as contas aqui, se necessário.
          break;
        case 'auth/cancelled-popup-request':
          error.value = 'Múltiplas tentativas de abrir o pop-up foram feitas. Por favor, tente novamente.';
          break;
        default:
          console.error("Unhandled Firebase Auth Error Code (loginWithGoogle):", authError.code);
          error.value = 'Ocorreu um erro ao tentar fazer login com o Google.';
      }
    } finally {
      loading.value = false;
    }
  };

  // Logout (a ser implementado)
  const logout = async () => { /* ... */ };

  // Reset de senha (a ser implementado)
  const resetPassword = async (email: string) => { /* ... */ };

  return {
    user,
    loading,
    error,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    // loginWithGithub, // Comentado
    logout,
    resetPassword,
  };
};