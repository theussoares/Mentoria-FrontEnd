// utils/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCe-Ja4kiXF8R18GNHup80mSosri5peZDo",
    authDomain: "mentoria-frontend.firebaseapp.com",
    projectId: "mentoria-frontend",
    storageBucket: "mentoria-frontend.firebasestorage.app",
    messagingSenderId: "832085218162",
    appId: "1:832085218162:web:d08bb8b8956915e86d03eb",
    measurementId: "G-RTGMLZM6EH"
  };
  

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Providers de autenticação
export const googleProvider = new GoogleAuthProvider()
//export const githubProvider = new GithubAuthProvider()

// Configurações dos providers
googleProvider.addScope('profile')
googleProvider.addScope('email')

//githubProvider.addScope('user:email')