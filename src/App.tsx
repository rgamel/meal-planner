import './styles.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ButtonAppBar from 'components/ButtonAppBar';
import { Box } from '@mui/material';
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
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <ButtonAppBar />
            <Outlet />
        </Box>
    );
}
