/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserSignUpData, UserLoginData } from '../Interfaces/User';
import { defaultUserSignUpState, defaultUserLoginState } from '../Helpers/constants';
import UserService from '../Services/user';
import { handleCheckout } from '../Helpers/stripe';
import Image from '../Images/signupimage.jpeg';
import '../Styles/UserSignUp.css';

// eslint-disable-next-line react/function-component-definition
const UserAuthentication: React.FC = () => {
  const fee = useSelector((state: any) => state.fee);
  const [formData, setFormData] = useState<UserSignUpData | UserLoginData>(
    defaultUserSignUpState,
  );
  const [hovered, setHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [successfulAction, setSuccessfulAction] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Track whether it's sign-up or login

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      UserService.register(formData as UserSignUpData)
        .then((res: any) => {
          if (res.status === 201) {
            setSuccessfulAction(true);
            toast.success('Success! Signed up successfully.');
            setFormData(defaultUserSignUpState);
            handleCheckout({ fee, email: (formData as UserSignUpData).email });
          } else if (res?.response?.data) {
            setErrors(res.response.data);
            toast.error(
              'Error in sign-up form! Please click on the highlighted input fields to find out more.',
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
                  setSuccessfulAction(true);
                  toast.success('Success! Signed in successfully.');
                  setFormData(defaultUserLoginState);
                  handleCheckout({ fee, email: formData.username })
                } else if (res?.response?.data) {
                  setErrors(res.response.data);
                  toast.error(
                    'Error in login form! Please click on the highlighted input fields to find out more.',
                  );
                }
              })
              .catch(() => toast.error('Error! Unable to sign in. Please try again later.'));
          }
        })
    }
  };

  const buttonStyle = {
    '--slist': hovered ? '#20A4F3, #2EC4B6' : '#2EC4B6, #20A4F3',
  } as React.CSSProperties;

  console.log({ errors, successfulAction });

  return (
    <div className="sign_up_container">
      <ToastContainer position="top-center" />
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
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={(formData as UserSignUpData).email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label>Username:</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Username"
                      />
                    </div>
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
                        />
                        <input
                          type="text"
                          name="last_name"
                          value={(formData as UserSignUpData).last_name}
                          onChange={handleChange}
                          required
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <label>Confirm Password:</label>
                      <input
                        type="password"
                        name="password_confirm"
                        value={(formData as UserSignUpData).password_confirm}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                      />
                    </div>
                  </>
                )}
                {!isSignUp && (
                  <>
                    <div>
                      <label>Email:</label>
                      <input
                        type="text"
                        name="username"
                        value={(formData as UserLoginData).username}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={(formData as UserSignUpData | UserLoginData).password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                      />
                    </div>
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
