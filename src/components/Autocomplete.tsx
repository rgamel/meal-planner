// import React, {
//     ChangeEvent,
//     Dispatch,
//     KeyboardEventHandler,
//     MouseEventHandler,
//     SetStateAction,
//     useMemo,
//     useState,
// } from 'react';

// type AutoCompleteProps = {
//     suggestions: string[];
//     addItem: (input: string) => void;
//     selected: string;
//     setSelected: Dispatch<SetStateAction<string>>;
// };
// function AutoComplete({ suggestions, addItem, selected, setSelected }: AutoCompleteProps) {
//     const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
//     const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const userInput = e.target.value;

//         const unLinked = suggestions.filter(
//             (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
//         );

//         setSelected(e.target.value);
//         setFilteredSuggestions(unLinked);
//         setActiveSuggestionIndex(0);
//         setShowSuggestions(true);
//     };

//     const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
//         switch (e.key) {
//             case 'Tab':
//             case 'Enter':
//                 if (selected.trim().length === 0) return;
//                 setSelected(filteredSuggestions[activeSuggestionIndex]);
//                 setShowSuggestions(false);
//                 break;
//             case 'ArrowUp':
//                 if (activeSuggestionIndex > 0) {
//                     setActiveSuggestionIndex(activeSuggestionIndex - 1);
//                 }
//                 break;
//             case 'ArrowDown':
//                 if (activeSuggestionIndex < filteredSuggestions.length - 1) {
//                     setActiveSuggestionIndex(activeSuggestionIndex + 1);
//                 }
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleAddItem = (input: string) => {
//         addItem(input);
//         setSelected(input);
//         setShowSuggestions(false);
//     };

//     function SuggestionsListComponent() {
//         const onClick: MouseEventHandler<HTMLElement> = (e) => {
//             setFilteredSuggestions([]);
//             setSelected((e.target as HTMLElement).innerText);
//             setActiveSuggestionIndex(0);
//             setShowSuggestions(false);
//         };

//         return useMemo(
//             () =>
//                 filteredSuggestions.length ? (
//                     <ul className="suggestions">
//                         {filteredSuggestions.map((suggestion, index) => {
//                             let className;
//                             if (index === activeSuggestionIndex) {
//                                 className = 'suggestion-active';
//                             }
//                             return (
//                                 // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
//                                 <li className={className} key={suggestion} onClick={onClick}>
//                                     {suggestion}
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 ) : (
//                     <div className="no-suggestions">
//                         <em>{`"${selected}" not found. Add it?`}</em>
//                         <button type="button" onClick={() => handleAddItem(selected.trim())}>
//                             +
//                         </button>
//                     </div>
//                 ),
//             [],
//         );
//     }

//     return (
//         <>
//             <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={selected} />
//             {showSuggestions && selected && <SuggestionsListComponent />}
//         </>
//     );
// }
// export default AutoComplete;

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Dispatch, SetStateAction, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

type ComboBoxProps = {
    suggestions: string[];
    label: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    addItem: (item: string) => void;
    deleteItem: (item: string) => void;
};

const filter = createFilterOptions<string>();

export default function ComboBox({ suggestions, label, selected, setSelected, addItem, deleteItem }: ComboBoxProps) {
    const [value, setValue] = useState<string>('');
    const handleDelete = (option: string) => {
        deleteItem(option);
    };
    return (
        // TODO: get back ability to add options
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={suggestions}
            value={selected || ''}
            onChange={(_, newValue: string | null) => {
                if (!newValue) return;
                setSelected(newValue);
                if (!suggestions.includes(newValue)) {
                    addItem(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                    filtered.push(inputValue);
                }
                return filtered;
            }}
            inputValue={value}
            onInputChange={(_, newValue) => {
                setValue(newValue);
                setSelected('');
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <ListItem {...props}>
                    <ListItemText>{option}</ListItemText>
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
