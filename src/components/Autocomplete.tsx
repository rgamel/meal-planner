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
import Autocomplete from '@mui/material/Autocomplete';
import { Dispatch, SetStateAction, useState } from 'react';

type ComboBoxProps = {
    suggestions: string[];
    label: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
};

export default function ComboBox({ suggestions, label, selected, setSelected }: ComboBoxProps) {
    const [inputValue, setInputValue] = useState<string>('');

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
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                setSelected('');
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// const filter = createFilterOptions<IngredientOptionType>();

// export default function FreeSoloCreateOption({ suggestions }: { suggestions: string[] }) {
//     const [value, setValue] = React.useState<IngredientOptionType | null>(null);
//     return (
//         <Autocomplete
//             value={value}
//             onChange={(event, newValue) => {
//                 if (typeof newValue === 'string') {
//                     setValue({
//                         name: newValue,
//                     });
//                     // } else if (newValue && newValue.inputValue) {
//                     //     // Create a new value from the user input
//                     //     setValue({
//                     //         name: newValue.inputValue,
//                     //     });
//                 } else {
//                     setValue(newValue);
//                 }
//             }}
//             filterOptions={(options, params) => {
//                 const filtered = filter(options, params);

//                 const { inputValue } = params;
//                 // Suggest the creation of a new value
//                 const isExisting = options.some((option) => inputValue === option.name);
//                 if (inputValue !== '' && !isExisting) {
//                     filtered.push({
//                         inputValue,
//                         name: `Add "${inputValue}"`,
//                     });
//                 }

//                 return filtered;
//             }}
//             selectOnFocus
//             clearOnBlur
//             handleHomeEndKeys
//             options={optionArr}
//             getOptionLabel={(option) => {
//                 // Value selected with enter, right from the input
//                 if (typeof option === 'string') {
//                     return option;
//                 }
//                 // Add "xxx" option created dynamically
//                 if (option.inputValue) {
//                     return option.inputValue;
//                 }
//                 // Regular option
//                 return option.name;
//             }}
//             renderOption={(props, option) => <li {...props}>{option.name}</li>}
//             sx={{ width: 300 }}
//             freeSolo
//             renderInput={(params) => <TextField {...params} label="Free solo with text demo" />}
//         />
//     );
// }

// interface IngredientOptionType {
//     inputValue?: string;
//     name: string;
//     id?: number;
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films: readonly FilmOptionType[] = [
//     { name: 'The Shawshank Redemption', id: 1994 },
//     { name: 'The Godfather', id: 1972 },
//     { name: 'The Godfather: Part II', id: 1974 },
//     { name: 'The Dark Knight', id: 2008 },
//     { name: '12 Angry Men', id: 1957 },
//     { name: "Schindler's List", id: 1993 },
//     { name: 'Pulp Fiction', id: 1994 },
//     {
//         name: 'The Lord of the Rings: The Return of the King',
//         id: 2003,
//     },
//     { name: 'The Good, the Bad and the Ugly', id: 1966 },
//     { name: 'Fight Club', id: 1999 },
//     {
//         name: 'The Lord of the Rings: The Fellowship of the Ring',
//         id: 2001,
//     },
//     {
//         name: 'Star Wars: Episode V - The Empire Strikes Back',
//         id: 1980,
//     },
//     { name: 'Forrest Gump', id: 1994 },
//     { name: 'Inception', id: 2010 },
//     {
//         name: 'The Lord of the Rings: The Two Towers',
//         id: 2002,
//     },
//     { name: "One Flew Over the Cuckoo's Nest", id: 1975 },
//     { name: 'Goodfellas', id: 1990 },
//     { name: 'The Matrix', id: 1999 },
//     { name: 'Seven Samurai', id: 1954 },
//     {
//         name: 'Star Wars: Episode IV - A New Hope',
//         id: 1977,
//     },
//     { name: 'City of God', id: 2002 },
//     { name: 'Se7en', id: 1995 },
//     { name: 'The Silence of the Lambs', id: 1991 },
//     { name: "It's a Wonderful Life", id: 1946 },
//     { name: 'Life Is Beautiful', id: 1997 },
//     { name: 'The Usual Suspects', id: 1995 },
//     { name: 'Léon: The Professional', id: 1994 },
//     { name: 'Spirited Away', id: 2001 },
//     { name: 'Saving Private Ryan', id: 1998 },
//     { name: 'Once Upon a Time in the West', id: 1968 },
//     { name: 'American History X', id: 1998 },
//     { name: 'Interstellar', id: 2014 },
//     { name: 'Casablanca', id: 1942 },
//     { name: 'City Lights', id: 1931 },
//     { name: 'Psycho', id: 1960 },
//     { name: 'The Green Mile', id: 1999 },
//     { name: 'The Intouchables', id: 2011 },
//     { name: 'Modern Times', id: 1936 },
//     { name: 'Raiders of the Lost Ark', id: 1981 },
//     { name: 'Rear Window', id: 1954 },
//     { name: 'The Pianist', id: 2002 },
//     { name: 'The Departed', id: 2006 },
//     { name: 'Terminator 2: Judgment Day', id: 1991 },
//     { name: 'Back to the Future', id: 1985 },
//     { name: 'Whiplash', id: 2014 },
//     { name: 'Gladiator', id: 2000 },
//     { name: 'Memento', id: 2000 },
//     { name: 'The Prestige', id: 2006 },
//     { name: 'The Lion King', id: 1994 },
//     { name: 'Apocalypse Now', id: 1979 },
//     { name: 'Alien', id: 1979 },
//     { name: 'Sunset Boulevard', id: 1950 },
//     {
//         name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//         id: 1964,
//     },
//     { name: 'The Great Dictator', id: 1940 },
//     { name: 'Cinema Paradiso', id: 1988 },
//     { name: 'The Lives of Others', id: 2006 },
//     { name: 'Grave of the Fireflies', id: 1988 },
//     { name: 'Paths of Glory', id: 1957 },
//     { name: 'Django Unchained', id: 2012 },
//     { name: 'The Shining', id: 1980 },
//     { name: 'WALL·E', id: 2008 },
//     { name: 'American Beauty', id: 1999 },
//     { name: 'The Dark Knight Rises', id: 2012 },
//     { name: 'Princess Mononoke', id: 1997 },
//     { name: 'Aliens', id: 1986 },
//     { name: 'Oldboy', id: 2003 },
//     { name: 'Once Upon a Time in America', id: 1984 },
//     { name: 'Witness for the Prosecution', id: 1957 },
//     { name: 'Das Boot', id: 1981 },
//     { name: 'Citizen Kane', id: 1941 },
//     { name: 'North by Northwest', id: 1959 },
//     { name: 'Vertigo', id: 1958 },
//     {
//         name: 'Star Wars: Episode VI - Return of the Jedi',
//         id: 1983,
//     },
//     { name: 'Reservoir Dogs', id: 1992 },
//     { name: 'Braveheart', id: 1995 },
//     { name: 'M', id: 1931 },
//     { name: 'Requiem for a Dream', id: 2000 },
//     { name: 'Amélie', id: 2001 },
//     { name: 'A Clockwork Orange', id: 1971 },
//     { name: 'Like Stars on Earth', id: 2007 },
//     { name: 'Taxi Driver', id: 1976 },
//     { name: 'Lawrence of Arabia', id: 1962 },
//     { name: 'Double Indemnity', id: 1944 },
//     {
//         name: 'Eternal Sunshine of the Spotless Mind',
//         id: 2004,
//     },
//     { name: 'Amadeus', id: 1984 },
//     { name: 'To Kill a Mockingbird', id: 1962 },
//     { name: 'Toy Story 3', id: 2010 },
//     { name: 'Logan', id: 2017 },
//     { name: 'Full Metal Jacket', id: 1987 },
//     { name: 'Dangal', id: 2016 },
//     { name: 'The Sting', id: 1973 },
//     { name: '2001: A Space Odyssey', id: 1968 },
//     { name: "Singin' in the Rain", id: 1952 },
//     { name: 'Toy Story', id: 1995 },
//     { name: 'Bicycle Thieves', id: 1948 },
//     { name: 'The Kid', id: 1921 },
//     { name: 'Inglourious Basterds', id: 2009 },
//     { name: 'Snatch', id: 2000 },
//     { name: '3 Idiots', id: 2009 },
//     { name: 'Monty Python and the Holy Grail', id: 1975 },
// ];
