import './styles.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'components/ButtonAppBar';
import { useContext, useEffect } from 'react';
import { UserContext } from 'app/userContext';

export default function App() {
    const { user } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(() => {
        if (user === null && window.location.pathname !== '/') {
            nav('/');
        }
        if (user !== null && window.location.pathname === '/') {
            nav('/plans');
        }
    }, [user, nav]);

    return (
        <div className="h-full w-full bg-gray-100 min-h-screen">
            <div className="mx-auto max-w-md">
                <ButtonAppBar />
                <Outlet />
            </div>
        </div>
    );
}
