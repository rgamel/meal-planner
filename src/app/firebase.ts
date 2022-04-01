import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; // TODO
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: 'AIzaSyB19kiBtlI3chGsXiIHIqpIhgb9B_4r5OI',
    authDomain: 'mealplanner-ddb4f.firebaseapp.com',
    projectId: 'mealplanner-ddb4f',
    storageBucket: 'mealplanner-ddb4f.appspot.com',
    messagingSenderId: '1001789350756',
    appId: '1:1001789350756:web:675cf99885b52701781071',
    measurementId: 'G-S45HKCZD6P',
};

export const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const db = getFirestore(fire);
export const functions = getFunctions();
