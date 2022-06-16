import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { useState, MouseEvent, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { UserContext } from 'app/userContext';
import { Avatar } from '@mui/material';

export default function ButtonAppBar() {
    const { user, signInWithGoogle, signOutUser } = useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClick = () => {
        if (!user) {
            signInWithGoogle();
            return;
        }
        signOutUser();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={handleOpenNavMenu}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Grocery Planner
                    </Typography>
                    <IconButton onClick={handleOpenUserMenu}>
                        {!user ? (
                            <Icon>account_circle</Icon>
                        ) : (
                            <Avatar alt={user.displayName || ''} src={user.photoURL || ''}>
                                {' '}
                            </Avatar>
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ mt: '45px' }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/plans" style={{ textDecoration: 'none', color: 'black' }}>
                        Plans
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/recipes" style={{ textDecoration: 'none', color: 'black' }}>
                        Recipes
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/groceries" style={{ textDecoration: 'none', color: 'black' }}>
                        Groceries
                    </Link>
                </MenuItem>
            </Menu>
            <Menu
                id="menu-userauth"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: '45px' }}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button onClick={handleClick}>{`Sign ${!user ? 'in with Google' : 'out'}`}</Button>
                </MenuItem>
            </Menu>
        </Box>
    );
}
