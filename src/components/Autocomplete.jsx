import { useState } from "react";

const AutoComplete = ({ suggestions, addItem, selected, setSelected }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const onChange = (e) => {
        const userInput = e.target.value;

        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setSelected(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onKeyDown = (e) => {
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

    const handleAddItem = (input) => {
        addItem(input);
        setSelected(input);
        setShowSuggestions(false);
    }

    const SuggestionsListComponent = () => {
        const onClick = (e) => {
            setFilteredSuggestions([]);
            setSelected(e.target.innerText);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        };

        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <em>{`"${selected}" not found. Add it?`}</em>
                <button onClick={() => handleAddItem(selected.trim())}>+</button>
            </div>
        );
    };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={selected}
            />
            {showSuggestions && selected && <SuggestionsListComponent />}
        </>
    );
};
export default AutoComplete;

