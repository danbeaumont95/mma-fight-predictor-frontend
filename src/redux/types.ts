export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// Define the interface for the state
export interface AppState {
  lightModeEnabled: boolean;
}

// Define the action interface
export interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

// Create a union type for all possible actions
export type AppActionTypes = ToggleDarkModeAction;
