import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
    addItem: (item: EntityOptionType) => Entity;
    deleteItem: (id: string) => void;
};

const filter = createFilterOptions<EntityOptionType>();

export default function ComboBox({ suggestions, label, selected, setSelected, addItem, deleteItem }: ComboBoxProps) {
    const [value, setValue] = useState('');

    const handleDelete = useCallback(
        (option: EntityOptionType) => {
            if (!option.id) return;
            deleteItem(option.id);
        },
        [deleteItem],
    );

    const getOptionLabel = useCallback((option: EntityOptionType) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.name;
    }, []);

    const onChange = useCallback(
        (_, newValue) => {
            if (typeof newValue === 'string') {
                setSelected({
                    name: newValue,
                });
            } else if (newValue?.inputValue) {
                setSelected(addItem({ name: newValue.inputValue.trim().toLowerCase() }));
            } else {
                setSelected(newValue);
            }
        },
        [setSelected, addItem],
    );

    const filterOptions = useCallback((options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option: EntityOptionType) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
            });
        }
        return filtered;
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    const renderInput = useCallback((params) => <TextField {...params} label={label} />, [label]);

    const renderOption = useCallback(
        (props, option) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ListItem {...props} key={`${option.name}__${option.id}`}>
                <ListItemText>{option.name}</ListItemText>
                <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDelete(option)}>
                        <Icon>highlight_off</Icon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ),
        [handleDelete],
    );

    return (
        <Autocomplete
            isOptionEqualToValue={(a, b) => (a?.name || '') === (b?.name || '')}
            id="combo-box-demo"
            options={suggestions as EntityOptionType[]}
            getOptionLabel={getOptionLabel}
            value={selected}
            onChange={onChange}
            filterOptions={filterOptions}
            inputValue={value}
            onInputChange={(_, newValue) => {
                setValue(newValue);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderInput={renderInput}
            renderOption={renderOption}
        />
    );
}
