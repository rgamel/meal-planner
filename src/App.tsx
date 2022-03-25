import React from 'react';
import './styles.css';
import { Outlet, Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav
            style={{
                borderBottom: 'solid 1px',
                paddingBottom: '1rem',
            }}
        >
            <Link to="/recipes">Recipes</Link> | <Link to="/addRecipe">Add Recipe</Link> |{' '}
            <Link to="/groceries">Groceries</Link>
        </nav>
    );
}

function App() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
