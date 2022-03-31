import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; // TODO
import { getFunctions } from 'firebase/functions';
import config from '../firebase-config.json';

export const fire = initializeApp(config.result.sdkConfig);
export const auth = getAuth(fire);
export const db = getFirestore(fire);
export const functions = getFunctions();
