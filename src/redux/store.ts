/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  CHANGE_FEE,
  ChangeFeeAction,
  LOGGED_IN_USER,
  LoggedInUserAction,
} from './types';

export interface User {
  email: string;
}

// Define the interface for the state
interface AppState {
  lightModeEnabled: boolean;
  fee: string;
  user: User;
}

// Define the initial state
const initialState: AppState = {
  lightModeEnabled: false,
  fee: '',
  user: { email: '' },
};

// Define the action types
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// Define the action interface
interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

// Define the reducer function to handle state changes
// eslint-disable-next-line default-param-last
const darkModeReducer = (state = initialState, action:
  ToggleDarkModeAction | ChangeFeeAction | LoggedInUserAction):
  AppState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        lightModeEnabled: !state.lightModeEnabled,
      };
    case CHANGE_FEE:
      return {
        ...state,
        fee: action.payload,
      };
    case LOGGED_IN_USER:
      console.log(action.payload, 'action');
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

// Configure redux-persist
const persistConfig = {
  key: 'root', // key for the storage
  storage, // use the storage library you imported
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, darkModeReducer);

// Create the Redux store
const store = createStore(persistedReducer, applyMiddleware(/* any middleware you need */));

// Create a persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
