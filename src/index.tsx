import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.createElement('section');
container.setAttribute('id', 'App');
const root = ReactDOMClient.createRoot(container);
root.render(<React.StrictMode>
    <App />
</React.StrictMode>);

document.getElementById('root')?.append(container);

reportWebVitals();
