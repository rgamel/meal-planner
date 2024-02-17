import { Link, ListItem, Typography } from '@mui/material';
import { titleCase } from 'helpers';
import { Link as RouterLink } from 'react-router-dom';

export function PlanListItem({ id, name }: { id: string; name: string }) {
    return (
        <ListItem key={id}>
            <Typography>
                <Link component={RouterLink} to={`${id}`}>
                    {titleCase(name)}
                </Link>
            </Typography>
        </ListItem>
    );
}
