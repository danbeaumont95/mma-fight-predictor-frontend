/* eslint-disable default-param-last */
import { createStore } from 'redux';
import { CHANGE_FEE, ChangeFeeAction } from './types';

// Define the interface for the state
interface AppState {
  lightModeEnabled: boolean;
  fee: string;
}

// Define the initial state
const initialState: AppState = {
  lightModeEnabled: false,
  fee: '',
};

// Define the action types
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// Define the action interface
interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

// Define the reducer function to handle state changes
const darkModeReducer = (state = initialState, action: ToggleDarkModeAction | ChangeFeeAction):
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
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(darkModeReducer);

export default store;
