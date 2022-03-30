import { firebaseConfig } from 'config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; // TODO

export const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const db = getFirestore(fire);
