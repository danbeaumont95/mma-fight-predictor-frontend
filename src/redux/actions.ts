/* eslint-disable import/prefer-default-export */
// Import the necessary types
import { TOGGLE_DARK_MODE, ToggleDarkModeAction } from './types';

export const toggleDarkMode = (): ToggleDarkModeAction => ({
  type: TOGGLE_DARK_MODE,
});
