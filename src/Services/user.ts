import axios from 'axios';
import { url } from './url'
import { Tokens, UserLoginData, UserSignUpData } from '../Interfaces/User';

const register = async (user: UserSignUpData) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/user/`, user)
    return res;
  } catch (error) {
    return error;
  }
}
const login = async (user: UserLoginData) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/api/token/`, user)
    return res;
  } catch (error) {
    return error;
  }
}

const saveTokens = async (tokens: Tokens) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/user/save_tokens`, tokens)
    return res;
  } catch (error) {
    return error;
  }
}

const getUsernameFromEmail = async (email: string) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/get_username_from_email`, { email })
    return res;
  } catch (error) {
    return error;
  }
}

const checkAccessToken = async (access: string, email: string) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/user/check_access_token`, { access, email })
    return res;
  } catch (error) {
    return error
  }
}

const UserService = {
  register,
  login,
  saveTokens,
  getUsernameFromEmail,
  checkAccessToken,
};

export default UserService
