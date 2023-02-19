import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// import AuthProvider from './Component/Context/AuthProvider';
import { Provider } from 'react-redux';
import store from './Component/Store/AuthRedux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><Provider 
    store={store}><App /></Provider></BrowserRouter>);