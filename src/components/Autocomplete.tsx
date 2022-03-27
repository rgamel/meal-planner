import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Dispatch, SetStateAction, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Entity, EntityOptionType } from 'types';

type ComboBoxProps = {
    suggestions: Entity[];
    label: string;
    selected: EntityOptionType | null;
    setSelected: Dispatch<SetStateAction<EntityOptionType | null>>;
    addItem: (item: EntityOptionType) => void;
    deleteItem: (id: string) => void;
};

const filter = createFilterOptions<EntityOptionType>();

export default function ComboBox({ suggestions, label, selected, setSelected, addItem, deleteItem }: ComboBoxProps) {
    const [value, setValue] = useState('');

    const handleDelete = (option: EntityOptionType) => {
        if (!option.id) return;
        deleteItem(option.id);
    };
    return (
        // TODO: get back ability to add options
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={suggestions as EntityOptionType[]}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.name;
            }}
            value={selected}
            onChange={(_, newValue) => {
                if (typeof newValue === 'string') {
                    setSelected({
                        name: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    const itemToAdd = { name: newValue.inputValue };
                    setSelected({
                        name: newValue.inputValue,
                    });
                    addItem(itemToAdd);
                } else {
                    setSelected(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                    });
                }
                return filtered;
            }}
            inputValue={value}
            onInputChange={(_, newValue) => {
                setValue(newValue);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <ListItem {...props}>
                    <ListItemText>{option.name}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => handleDelete(option)}>
                            <Icon>highlight_off</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        />
    );
}
