import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import { store, persistor } from './redux/store';
import { AuthProvider } from './Components/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PersistGate>
  </Provider>,
);
