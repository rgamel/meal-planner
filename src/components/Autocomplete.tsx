import React, {
    ChangeEvent,
    Dispatch,
    KeyboardEventHandler,
    MouseEventHandler,
    SetStateAction,
    useMemo,
    useState,
} from 'react';

type AutoCompleteProps = {
    suggestions: string[];
    addItem: (input: string) => void;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
};
function AutoComplete({ suggestions, addItem, selected, setSelected }: AutoCompleteProps) {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        const unLinked = suggestions.filter(
            (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
        );

        setSelected(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch (e.key) {
            case 'Tab':
            case 'Enter':
                if (selected.trim().length === 0) return;
                setSelected(filteredSuggestions[activeSuggestionIndex]);
                setShowSuggestions(false);
                break;
            case 'ArrowUp':
                if (activeSuggestionIndex > 0) {
                    setActiveSuggestionIndex(activeSuggestionIndex - 1);
                }
                break;
            case 'ArrowDown':
                if (activeSuggestionIndex < filteredSuggestions.length - 1) {
                    setActiveSuggestionIndex(activeSuggestionIndex + 1);
                }
                break;
            default:
                break;
        }
    };

    const handleAddItem = (input: string) => {
        addItem(input);
        setSelected(input);
        setShowSuggestions(false);
    };

    function SuggestionsListComponent() {
        const onClick: MouseEventHandler<HTMLElement> = (e) => {
            setFilteredSuggestions([]);
            setSelected((e.target as HTMLElement).innerText);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        };

        return useMemo(
            () =>
                filteredSuggestions.length ? (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestionIndex) {
                                className = 'suggestion-active';
                            }
                            return (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="no-suggestions">
                        <em>{`"${selected}" not found. Add it?`}</em>
                        <button type="button" onClick={() => handleAddItem(selected.trim())}>
                            +
                        </button>
                    </div>
                ),
            [],
        );
    }

    return (
        <>
            <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={selected} />
            {showSuggestions && selected && <SuggestionsListComponent />}
        </>
    );
}
export default AutoComplete;
