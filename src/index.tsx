import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Recipes from './routes/Recipes';
import Groceries from './routes/Groceries';

ReactDOM.render(
    <React.StrictMode>
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
    </React.StrictMode>,
    document.getElementById('root'),
);
