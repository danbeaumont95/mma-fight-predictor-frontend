/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { InputProps, UserSignUpData } from '../../Interfaces/User';
import { capitalizeWords } from '../../Helpers/helpers';

function Input({
  inputName, formData, handleChange, inputHasError, errors, setHoveredElementId,
}: InputProps) {
  return (
    <div>
      <label>
        {capitalizeWords(inputName)}
        :
      </label>
      <input
        type={inputName}
        name={inputName}
        value={(formData as UserSignUpData)[inputName]}
        onChange={handleChange}
        required
        placeholder={capitalizeWords(inputName)}
        className={inputHasError(inputName) ? 'input_error' : undefined}
        data-tooltip-id={`signup-${inputName}-tooltip`}
        data-tooltip-content={inputHasError(inputName) ? errors[inputName].join(', ') : undefined}
        onMouseOver={() => setHoveredElementId(`signup-${inputName}-tooltip`)}
      />
    </div>
  )
}

export default Input
