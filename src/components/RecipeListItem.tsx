import React, { useState } from 'react';

function RecipeListItem({
    name,
    handleSelectRecipe,
}: {
    name: string;
    handleSelectRecipe: (recipeName: string) => void;
}) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        handleSelectRecipe(name);
        setChecked(!checked);
    };
    return (
        <li key={name}>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            {name}
        </li>
    );
}

export default RecipeListItem;
