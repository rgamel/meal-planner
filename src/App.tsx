import './styles.css';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from 'components/ButtonAppBar';
import { Box } from '@mui/material';

export default function App() {
    return (
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <ButtonAppBar />
            <Outlet />
        </Box>
    );
}
