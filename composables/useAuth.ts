// composables/useAuth.ts
import { ref } from 'vue';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  createUserWithEmailAndPassword, // Nova importação
  updateProfile,                // Nova importação
  type UserCredential,
  type AuthError
} from 'firebase/auth';
import { auth } from '~/utils/firebase'; // Ajuste o caminho se necessário

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string;
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
        avatar: firebaseUser.photoURL || '', // Substitua pelo caminho do seu avatar padrão
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

  // Registro com Email/Senha
  const registerWithEmail = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Atualiza o perfil do usuário com o nome fornecido
      await updateProfile(firebaseUser, { displayName: name });

      user.value = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || name, // Usa o nome atualizado ou o fornecido
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || '/img/default-avatar.png', // Avatar padrão
        provider: 'email',
        isNewUser: true, // Definitivamente um novo usuário
      };

      // TODO: Considerar criar o registro do estudante no Firestore aqui ou em um passo de onboarding
      // Ex: await createStudentInFirestore(firebaseUser.uid, name, email, firebaseUser.photoURL);

    } catch (e: any) {
      const authError = e as AuthError;
      console.error("Firebase Auth Error Details (registerWithEmail):", authError);
      switch (authError.code) {
        case 'auth/email-already-in-use':
          error.value = 'Este endereço de e-mail já está em uso por outra conta.';
          break;
        case 'auth/invalid-email':
          error.value = 'O formato do e-mail fornecido é inválido.';
          break;
        case 'auth/weak-password':
          error.value = 'A senha é muito fraca. Por favor, use uma senha mais forte.';
          break;
        default:
          console.error("Unhandled Firebase Auth Error Code (registerWithEmail):", authError.code);
          error.value = 'Ocorreu um erro ao tentar registrar. Tente novamente.';
      }
    } finally {
      loading.value = false;
    }
  };

  // Login com Google (implementado anteriormente)
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
        avatar: firebaseUser.photoURL || '/img/default-avatar.png',
        provider: 'google',
        isNewUser: additionalUserInfo?.isNewUser || false,
      };
      // TODO: Considerar criar o registro do estudante no Firestore se for um novo usuário
    } catch (e: any) {
      const authError = e as AuthError;
      console.error("Firebase Auth Error Details (loginWithGoogle):", authError);
      switch (authError.code) {
        case 'auth/popup-closed-by-user':
          error.value = 'O pop-up de login foi fechado antes da conclusão.';
          break;
        case 'auth/account-exists-with-different-credential':
          error.value = 'Já existe uma conta com este e-mail, mas com um método de login diferente.';
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
    logout,
    resetPassword,
  };
};