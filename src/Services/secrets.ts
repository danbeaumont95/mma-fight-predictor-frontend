import axios from 'axios';
import { url } from './url'

const getTestPriceId = async (price: number) => {
  const res = await axios.get(`${url}/mma_fight_predictor/get_test_price_id?price=${price}`)
  return res;
};
const getTestPublishingId = async () => {
  const res = await axios.get(`${url}/mma_fight_predictor/get_test_publishing_id`)
  return res;
};

const SecretService = {
  getTestPriceId,
  getTestPublishingId,
};

export default SecretService;
