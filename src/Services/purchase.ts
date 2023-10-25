import axios from 'axios';
import { url } from './url'

const hasUserPurchasedEvent = async (event_name: string, access: string) => {
  const res = await axios.put(`${url}/mma_fight_predictor/purchase/`, { event_name, access })
  return res;
};

const PurchaseService = {
  hasUserPurchasedEvent,
};

export default PurchaseService
