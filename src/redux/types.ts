export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const CHANGE_FEE = 'CHANGE_FEE';
export const LOGGED_IN_USER = 'LOGGED_IN_USER'

// Define the interface for the state
export interface AppState {
  lightModeEnabled: boolean;
  fee: string;
}

// Define the action interface
export interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

export interface ChangeFeeAction {
  type: typeof CHANGE_FEE;
  payload: string;
}

export interface LoggedInUserAction {
  type: typeof LOGGED_IN_USER;
  payload: {[key: string]: string}
}

// Create a union type for all possible actions
export type AppActionTypes = ToggleDarkModeAction;
