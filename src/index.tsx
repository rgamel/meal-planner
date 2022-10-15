import UserContextProvider from 'app/userContext';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import RecipesContextProvider from './app/recipeContext';
import Groceries from './features/groceries/Groceries';
import Recipes from './features/recipes/Recipes';
import Plans from './features/plans/Plans';
import Plan from './features/plans/Plan';

const theme = createTheme({
    palette: {
        // mode: 'dark',
        // primary: {
        //     main: '#FFF',
        // },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <ThemeProvider theme={theme}>
                <RecipesContextProvider>
                    <ConfirmProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route path="recipes" element={<Recipes />} />
                                    <Route path="groceries" element={<Groceries />} />
                                    <Route path="plans" element={<Plans />} />
                                    <Route path="plans/:id" element={<Plan />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ConfirmProvider>
                </RecipesContextProvider>
            </ThemeProvider>
            <CssBaseline />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
