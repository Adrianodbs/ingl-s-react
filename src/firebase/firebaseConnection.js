import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAwAPFiR-76koRK5Ft8sfA-4jAm6QRy8lA',
  authDomain: 'ingles-f1d4c.firebaseapp.com',
  projectId: 'ingles-f1d4c',
  storageBucket: 'ingles-f1d4c.appspot.com',
  messagingSenderId: '1068587384609',
  appId: '1:1068587384609:web:9aec2f58a1993afcc24860'
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
