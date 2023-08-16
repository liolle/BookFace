import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';



ReactDOM.render(
  <HashRouter >
    <App />
    <ToastContainer /> 
  </HashRouter>,
  document.getElementById("root")
)