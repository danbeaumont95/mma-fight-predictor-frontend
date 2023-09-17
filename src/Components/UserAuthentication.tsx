/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tooltip } from 'react-tooltip'
import { UserSignUpData, UserLoginData } from '../Interfaces/User';
import { defaultUserSignUpState, defaultUserLoginState } from '../Helpers/constants';
import UserService from '../Services/user';
import { handleCheckout } from '../Helpers/stripe';
import Image from '../Images/signupimage.jpeg';
import '../Styles/UserSignUp.css';
import Input from './UI-Components/Input';

// eslint-disable-next-line react/function-component-definition
const UserAuthentication: React.FC = () => {
  const fee = useSelector((state: any) => state.fee);
  const [formData, setFormData] = useState<UserSignUpData | UserLoginData>(
    defaultUserSignUpState,
  );
  const [hovered, setHovered] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSignUp, setIsSignUp] = useState(true);
  const [hoveredElementId, setHoveredElementId] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const newItems = { ...errors };
    delete newItems[name];
    setErrors(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      UserService.register(formData as UserSignUpData)
        .then((res: any) => {
          if (res.status === 201) {
            toast.success('Success! Signed up successfully.');
            setFormData(defaultUserSignUpState);
            handleCheckout({ fee, email: (formData as UserSignUpData).email });
          } else if (res?.response?.data) {
            setErrors(res.response.data);
            toast.error(
              'Error in sign-up form! Please hover over the highlighted input fields to find out more.',
            );
          }
        })
        .catch(() => toast.error('Error! Unable to sign up. Please try again later.'));
    } else {
      // user logs in with email and password, but backend requires username and password
      UserService.getUsernameFromEmail(formData.username)
        .then((resx: any) => {
          if (resx.data.message === 'Success!') {
            UserService.login({ username: resx.data.data, password: formData.password } as any)
              .then((res: any) => {
                if (res.status === 200) {
                  toast.success('Success! Signed in successfully.');
                  setFormData(defaultUserLoginState);
                  handleCheckout({ fee, email: formData.username })
                  localStorage.setItem('accessToken', res.data.access)
                  localStorage.setItem('refreshToken', res.data.refresh)
                } else if (res?.response?.data) {
                  setErrors(res.response.data);
                  toast.error(
                    'Error in login form! Email/password do not match.',
                  );
                }
              })
              .catch(() => toast.error('Error! Unable to sign in. Please try again later.'));
          } else {
            toast.error('Error! Email not found.')
          }
        })
    }
  };

  const inputHasError = (name: keyof UserSignUpData) => Object.keys(errors).indexOf(name) > -1

  const buttonStyle = {
    '--slist': hovered ? '#20A4F3, #2EC4B6' : '#2EC4B6, #20A4F3',
  } as React.CSSProperties;

  return (
    <div className="sign_up_container">
      <ToastContainer position="top-center" autoClose={3000} />
      <Tooltip id={hoveredElementId} />

      <div className="sign_up_containers">
        <div className="sign_up_image_container">
          <img src={Image} alt="sign-up" className="sign_up_image" />
        </div>
        <div className="UserSignUp">
          <div className="form_details_container">
            <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            <div className="form_already_have_account_container">
              <h3>{isSignUp ? 'Already have an account?' : 'Don\'t have an account yet?'}</h3>
              <h3
                className="form_already_sign_in"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inside_form_container">
                {isSignUp && (
                  <>
                    <Input inputName="email" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />
                    <Input inputName="username" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />

                    <div>
                      <label>First Name and Last Name:</label>
                      <div className="name-inputs">
                        <input
                          type="text"
                          name="first_name"
                          value={(formData as UserSignUpData).first_name}
                          onChange={handleChange}
                          required
                          placeholder="First name"
                          className={inputHasError('first_name') ? 'input_error' : undefined}
                          data-tooltip-id="signup-first_name-tooltip"
                          data-tooltip-content={inputHasError('first_name') ? errors.first_name.join(', ') : undefined}
                          onMouseOver={() => setHoveredElementId('signup-first_name-tooltip')}
                        />
                        <input
                          type="text"
                          name="last_name"
                          value={(formData as UserSignUpData).last_name}
                          onChange={handleChange}
                          required
                          placeholder="Last name"
                          className={inputHasError('last_name') ? 'input_error' : undefined}
                          data-tooltip-id="signup-last_name-tooltip"
                          data-tooltip-content={inputHasError('last_name') ? errors.last_name.join(', ') : undefined}
                          onMouseOver={() => setHoveredElementId('signup-last_name-tooltip')}
                        />
                      </div>
                    </div>
                    <Input inputName="password" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />

                    <Input inputName="password_confirm" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />

                  </>
                )}
                {!isSignUp && (
                  <>
                    <Input inputName="email" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />

                    <Input inputName="password" formData={formData} handleChange={handleChange} inputHasError={inputHasError} errors={errors} setHoveredElementId={setHoveredElementId} />

                  </>
                )}
                <div className="sign_up_form_button_container">
                  <button
                    style={buttonStyle}
                    type="submit"
                    className="sign_up_button"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {isSignUp ? 'Sign Up Now!' : 'Sign In Now!'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
