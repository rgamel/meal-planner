import { CssBaseline } from '@mui/material';
import UserContextProvider from 'app/userContext';
import { Home } from 'features/home/Home';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RecipesContextProvider from './app/recipeContext';
import Groceries from './features/groceries/Groceries';
import Plan from './features/plans/Plan';
import Plans from './features/plans/Plans';
import Recipes from './features/recipes/Recipes';
import './styles.css';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <RecipesContextProvider>
                <ConfirmProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route path="" element={<Home />} />
                                <Route path="recipes" element={<Recipes />} />
                                <Route path="groceries" element={<Groceries />} />
                                <Route path="plans" element={<Plans />} />
                                <Route path="plans/:id" element={<Plan />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ConfirmProvider>
            </RecipesContextProvider>
            <CssBaseline />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
