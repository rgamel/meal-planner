import { Fab, Icon } from '@mui/material';

export function AddFab({ onClick }: { onClick: () => void }) {
    return (
        <Fab color="primary" aria-label="add" onClick={onClick} sx={{ position: 'fixed', bottom: 24, right: 24 }}>
            {' '}
            <Icon>add</Icon>
        </Fab>
    );
}
