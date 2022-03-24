import React, { useState } from 'react';

const RecipeListItem = ({ name, handleSelectRecipe }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        handleSelectRecipe(name);
        setChecked(!checked);
    }
    return (
        <li key={name}>
            <input type="checkbox" checked={checked} onChange={handleChange}/>
        {name}
    </li>
    );
};

export default RecipeListItem;
