import axios from 'axios';

const getFighterImage = async (name: string) => {
  const res = await axios.get(`http://127.0.0.1:8000/mma_fight_predictor/fighter/get_fighter_image?fighter=${name}`);
  return res;
}

const FighterService = {
  getFighterImage,
};

export default FighterService;
