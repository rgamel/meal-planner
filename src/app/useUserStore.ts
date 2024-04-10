import { GoogleAuthProvider, User, signInWithPopup, signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

interface UserStoreState {
    user: User | null;
    signInUser: () => Promise<void>;
    signOutUser: () => Promise<void>;
}

export const useUserStore = create(
    persist<UserStoreState>(
        (set) => ({
            user: null,
            signInUser: async () => {
                const result = await signInWithPopup(auth, provider);
                set({ user: result.user });
            },
            signOutUser: async () => {
                await signOut(auth);
                set({ user: null });
            },
        }),
        { name: 'user' },
    ),
);
