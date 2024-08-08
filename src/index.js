import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Apps from './Apps';
import ContextProvider from './context/Context';


ReactDOM.render(

    <ContextProvider>
        <Apps />
    </ContextProvider>

, document.getElementById("root")

);