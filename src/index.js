import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './responsive.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios  from "axios";
axios.defaults.baseURL = "https://itiffyconsultants.com/JUST-GO-LIVE/api"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={3000} position="top-center" />
  </Provider>,
);



