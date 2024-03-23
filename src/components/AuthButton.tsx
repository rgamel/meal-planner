import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { useState, MouseEvent, useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from 'app/userContext';
import { Avatar } from '@mui/material';
import { Button } from './Button';

export function AuthButton() {
    const { user, signInWithGoogle, signOutUser } = useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleClick = () => {
        if (!user) {
            signInWithGoogle();
            return;
        }
        signOutUser();
    };

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <IconButton onClick={handleOpenUserMenu}>
                {!user ? (
                    <Icon>account_circle</Icon>
                ) : (
                    <Avatar alt={user.displayName || ''} src={user.photoURL || ''}>
                        {' '}
                    </Avatar>
                )}
            </IconButton>
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
        </div>
    );
}
