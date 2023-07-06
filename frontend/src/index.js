import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom'

//creates a root for the React application by selecting an HTML element with the id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root'));

//rendering the React application.
root.render(

  //define the structure and components of the application.

  //BrowserRouter: to enable routing functionality for the entire application.
  //React.StrictMode: to perform additional runtime checks and warnings during development.
  <BrowserRouter> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

