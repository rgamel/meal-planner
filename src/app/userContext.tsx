import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import noop from 'lodash/fp/noop';
import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export const UserContext = createContext<{
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    signInWithGoogle: () => void;
    signOutUser: () => void;
}>({ user: null, setUser: noop, signInWithGoogle: noop, signOutUser: noop });

interface UserContextProviderProps {
    children?: JSX.Element[] | JSX.Element;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('user') || ''));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const signInWithGoogle = useCallback(async () => {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
    }, [setUser]);

    const signOutUser = useCallback(() => {
        void signOut(auth);
        setUser(null);
    }, [setUser]);

    const value = useMemo(
        () => ({ user, setUser, signInWithGoogle, signOutUser }),
        [user, setUser, signInWithGoogle, signOutUser],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
