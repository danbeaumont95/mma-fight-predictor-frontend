/* eslint-disable import/prefer-default-export */
// Import the necessary types
import { CHANGE_FEE, TOGGLE_DARK_MODE, ToggleDarkModeAction } from './types';

export const toggleDarkMode = (): ToggleDarkModeAction => ({
  type: TOGGLE_DARK_MODE,
});
export function changeFee(newFee: string) {
  return {
    type: CHANGE_FEE,
    payload: newFee,
  };
}
