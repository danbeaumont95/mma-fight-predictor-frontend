/* eslint-disable import/prefer-default-export */
// Import the necessary types
import { User } from './store';
import {
  CHANGE_FEE, TOGGLE_DARK_MODE, ToggleDarkModeAction, LOGGED_IN_USER,
} from './types';

export const toggleDarkMode = (): ToggleDarkModeAction => ({
  type: TOGGLE_DARK_MODE,
});
export function changeFee(newFee: string) {
  return {
    type: CHANGE_FEE,
    payload: newFee,
  };
}

export function updateLoggedInUser(user: User) {
  return {
    type: LOGGED_IN_USER,
    payload: user,
  }
}
