import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Recipes from './features/recipes/Recipes';
import Groceries from './features/groceries/Groceries';
import RecipesContextProvider from './app/context';

ReactDOM.render(
    <React.StrictMode>
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
    </React.StrictMode>,
    document.getElementById('root'),
);
