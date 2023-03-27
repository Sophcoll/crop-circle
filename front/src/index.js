import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProduceContextProvider } from './context/ProduceContext';
import { AuthContextProvider} from "./context/AuthContextProvider"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProduceContextProvider>
    <App />
      </ProduceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


