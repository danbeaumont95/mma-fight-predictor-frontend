/* eslint-disable no-unused-vars */
import React from 'react';

export interface UserSignUpData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}
export interface UserLoginData {
  username: string;
  password: string;
}

export interface InputProps {
  inputName: keyof UserSignUpData;
  formData: UserSignUpData | UserLoginData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputHasError: (name: keyof UserSignUpData) => boolean;
  errors: any;
  setHoveredElementId: (value: React.SetStateAction<string>) => void;
}
