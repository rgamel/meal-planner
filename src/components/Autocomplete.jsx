import { useState } from "react";

const AutoComplete = ({ suggestions }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e) => {
        const userInput = e.target.value;

        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onKeyDown = (e) => {
        console.log(e.key)
        switch (e.key) {
            case 'Enter':
                setInput(filteredSuggestions[activeSuggestionIndex]);
                setShowSuggestions(false);
                break;
            case 'ArrowUp':
            if (activeSuggestionIndex > 0) {
                    setActiveSuggestionIndex(activeSuggestionIndex - 1);
                    console.log(activeSuggestionIndex);
                }
                break;
            case 'ArrowDown':
                console.log('gotHere', activeSuggestionIndex)
                if (activeSuggestionIndex < filteredSuggestions.length - 1) {
                    console.log('andHere', activeSuggestionIndex)
                    setActiveSuggestionIndex(activeSuggestionIndex + 1);
                    console.log(activeSuggestionIndex);
                }
                break;
            default:
                break;
        }
    }

    const SuggestionsListComponent = () => {
        const onClick = (e) => {
            setFilteredSuggestions([]);
            setInput(e.target.innerText);
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
            <div class="no-suggestions">
                <em>No suggestions, you're on your own!</em>
            </div>
        );
    };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </>
    );
};
export default AutoComplete;

