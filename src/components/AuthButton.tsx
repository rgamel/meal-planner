import { Avatar } from '@mui/material'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useUserStore } from 'app/useUserStore'
import { MouseEvent, useState } from 'react'

import { Button } from './Button'

export function AuthButton() {
  const [user, signInUser, signOutUser] = useUserStore((state) => [state.user, state.signInUser, state.signOutUser])
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  function handleClick() {
    if (!user) {
      void signInUser()
      return
    }
    void signOutUser()
  }

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  const displayName = user?.displayName ?? ''
  const photoUrl = user?.photoURL ?? ''
  const label = `Sign ${!user ? 'in with Google' : 'out'}`

  return (
    <div>
      <IconButton onClick={handleOpenUserMenu}>
        {!user ? <Icon>account_circle</Icon> : <Avatar alt={displayName} src={photoUrl} />}
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
          <Button onClick={handleClick}>{label}</Button>
        </MenuItem>
      </Menu>
    </div>
  )
}
