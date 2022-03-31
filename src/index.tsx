import { getConfig } from '@testing-library/react';
import UserContextProvider from 'app/userContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RecipesContextProvider from './app/recipeContext';
import Groceries from './features/groceries/Groceries';
import Recipes from './features/recipes/Recipes';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <RecipesContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="recipes" element={<Recipes />}>
                                Recipes
                            </Route>
                            <Route path="groceries" element={<Groceries />}>
                                Groceries
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </RecipesContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
