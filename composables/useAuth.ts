// composables/useAuth.ts
import { ref } from 'vue';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut, // Precisaremos para o logout
  sendPasswordResetEmail, // Precisaremos para reset de senha
  onAuthStateChanged, // Para observar o estado de autenticação
  type User as FirebaseUserType, // Renomeando para evitar conflito com nosso 'user' ref
  type UserCredential,
  type AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Importar setDoc e serverTimestamp
import { auth, db } from '~/utils/firebase'; // Ajuste o caminho se necessário

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string;
  provider: 'email' | 'google' | 'github';
  isNewUser?: boolean;
  roleId?: 1 | 2 | null; // 1 para papel padrão (Mentor, conforme sua última info), 2 para o outro papel
  // Adicione outros campos que você quer que estejam disponíveis globalmente sobre o usuário logado
  // como por exemplo, o mentorId se o onboarding já foi feito
  mentorId?: string | null; // Exemplo
}

export const useAuth = () => {
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);
  const loadingUser = ref(true); // Novo ref para indicar o carregamento inicial do usuário
  const error = ref<string | null>(null);

  // Função auxiliar para criar ou atualizar o perfil do usuário no Firestore
  const updateUserProfileInFirestore = async (
    firebaseUid: string,
    profileData: Partial<AuthUser> & { email?: string | null, name?: string | null, roleIdIfNotExists?: 1 | 2 }
  ) => {
    const userDocRef = doc(db, "users", firebaseUid);
    try {
      const docSnap = await getDoc(userDocRef);
      let roleToSet = profileData.roleIdIfNotExists; // Papel padrão para novos usuários

      if (docSnap.exists()) {
        // Usuário já existe, não sobrescrever roleId a menos que explicitamente passado
        // Poderia ter uma lógica para mesclar dados aqui
        const existingData = docSnap.data();
        roleToSet = existingData.roleId || roleToSet; // Mantém o roleId existente se houver
        console.log("Atualizando perfil existente no Firestore para:", firebaseUid);
        await setDoc(userDocRef, {
          name: profileData.name || existingData.name,
          email: profileData.email || existingData.email,
          avatar: profileData.avatar || existingData.avatar || '/img/default-avatar.png',
          roleId: roleToSet,
          lastLogin: serverTimestamp(), // Atualiza o último login
          // ... mesclar outros campos de `profileData` e `existingData` conforme necessário
        }, { merge: true }); // Mescla para não sobrescrever tudo
        return { ...existingData, ...profileData, roleId: roleToSet, id: firebaseUid } as AuthUser;

      } else {
        // Novo usuário, criar documento
        console.log("Criando novo perfil no Firestore para:", firebaseUid);
        const newProfile = {
          name: profileData.name,
          email: profileData.email,
          avatar: profileData.avatar || '/img/default-avatar.png',
          roleId: roleToSet, // Papel padrão definido aqui
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          points: 0, // Exemplo: Pontos iniciais
          levelId: 'initial', // Exemplo: Nível inicial
          badges: [], // Exemplo: Badges iniciais
          // Adicione outros campos da sua interface Student que devem ser inicializados
        };
        await setDoc(userDocRef, newProfile);
        return { ...newProfile, id: firebaseUid, provider: profileData.provider } as AuthUser; // provider pode vir do login social
      }
    } catch (e) {
      console.error("Erro ao salvar/atualizar perfil do usuário no Firestore:", e);
      return null; // Retorna null em caso de erro para que o login não seja bloqueado
    }
  };


  const mapFirebaseUserToAuthUser = async (firebaseUser: FirebaseUserType, isNew?: boolean): Promise<AuthUser | null> => {
    if (!firebaseUser) return null;

    const userDocRef = doc(db, "users", firebaseUser.uid);
    let userProfileData: Partial<AuthUser> = {};

    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        userProfileData = docSnap.data() as AuthUser;
      } else {
        // Documento não existe, pode ser um novo usuário que ainda não teve o perfil criado
        // ou um usuário existente sem perfil (menos comum se criarmos no registro)
        console.warn("Perfil do usuário não encontrado no Firestore para:", firebaseUser.uid);
      }
    } catch (e) {
      console.error("Erro ao buscar perfil no Firestore durante mapFirebaseUserToAuthUser:", e);
    }

    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || userProfileData.name || firebaseUser.email?.split('@')[0] || 'Usuário',
      email: firebaseUser.email,
      avatar: firebaseUser.photoURL || userProfileData.avatar || '/img/default-avatar.png',
      provider: firebaseUser.providerData?.[0]?.providerId.split('.')[0] as 'google' | 'email' || 'email',
      roleId: userProfileData.roleId || null, // Pega roleId do perfil ou define como null
      isNewUser: isNew,
      mentorId: userProfileData.mentorId || null, // Exemplo de como pegar mentorId
      // ...outros campos do userProfileData que você quer no AuthUser
    };
  };


  // Observador do estado de autenticação do Firebase
  onAuthStateChanged(auth, async (firebaseUser) => {
    loadingUser.value = true;
    if (firebaseUser) {
      // Usuário está logado
      const mappedUser = await mapFirebaseUserToAuthUser(firebaseUser);
      user.value = mappedUser;
      // Aqui você pode verificar se precisa redirecionar para onboarding
      // if (mappedUser && !mappedUser.mentorId && useRoute().path !== '/onboarding') {
      //   navigateTo('/onboarding');
      // }
    } else {
      // Usuário está deslogado
      user.value = null;
    }
    loadingUser.value = false;
  });


  const loginWithEmail = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // O onAuthStateChanged vai lidar com a atualização do user.value
      // Mas podemos forçar uma atualização do lastLogin no Firestore aqui se desejado
      if (userCredential.user) {
        await updateUserProfileInFirestore(userCredential.user.uid, { lastLogin: serverTimestamp() } as any);
        // O user.value será atualizado pelo onAuthStateChanged, que já chama mapFirebaseUserToAuthUser
      }
    } catch (e: any) { /* ... (tratamento de erro) ... */ }
    finally { loading.value = false; }
  };

  const loginWithGoogle = async () => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      if (additionalUserInfo?.isNewUser) {
        // Se é novo usuário, cria o perfil no Firestore com roleId padrão
        await updateUserProfileInFirestore(firebaseUser.uid, {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          roleIdIfNotExists: 1, // SEU PADRÃO (você mencionou 1)
          provider: 'google'
        });
        // onAuthStateChanged irá pegar e mapear o usuário
      } else if (firebaseUser) {
        // Usuário existente, apenas atualiza lastLogin
        await updateUserProfileInFirestore(firebaseUser.uid, { lastLogin: serverTimestamp() } as any);
        // onAuthStateChanged irá pegar e mapear o usuário
      }
    } catch (e: any) {  /* ... (tratamento de erro) ... */ }
    finally { loading.value = false; }
  };

  const registerWithEmail = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      const firebaseUser = userCredential.user;

      // Cria o perfil no Firestore para o novo usuário com roleId padrão
      await updateUserProfileInFirestore(firebaseUser.uid, {
        name: name,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL, // Geralmente nulo para email/senha
        roleIdIfNotExists: 1, // SEU PADRÃO (você mencionou 1)
        provider: 'email'
      });
      // onAuthStateChanged irá pegar e mapear o usuário
      // e marcará como isNewUser (embora isNewUser seja mais relevante para login social)

    } catch (e: any) { /* ... (tratamento de erro para registro) ... */ }
    finally { loading.value = false; }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut(auth);
      // user.value será null automaticamente pelo onAuthStateChanged
      // Redirecionar para a página de login
      // navigateTo('/auth/login'); // Se estiver usando Nuxt navigateTo
    } catch (e: any) {
      const authError = e as AuthError;
      console.error("Erro no logout:", authError.message);
      error.value = "Erro ao tentar sair.";
    } finally {
      loading.value = false;
    }
  };

  // ... (resetPassword)

  return {
    user,
    loading,
    loadingUser, // Exportar o novo loading
    error,
    loginWithEmail,
    loginWithGoogle,
    registerWithEmail,
    logout,
    // resetPassword,
  };
};