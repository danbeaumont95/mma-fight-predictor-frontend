import axios from 'axios';
import { url } from './url'
import { UserLoginData, UserSignUpData } from '../Interfaces/User';

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

const getUsernameFromEmail = async (email: string) => {
  try {
    const res = await axios.post(`${url}/mma_fight_predictor/get_username_from_email`, { email })
    return res;
  } catch (error) {
    return error;
  }
}

const UserService = {
  register,
  login,
  getUsernameFromEmail,
};

export default UserService
