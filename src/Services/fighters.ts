import axios from 'axios';

const getFighterImage = async (name: string) => {
  const res = await axios.get(`http://127.0.0.1:8000/mma_fight_predictor/fighter/get_fighter_image?fighter=${name}`);
  return res;
}

const getMatchupStats = async (name1: string, name2: string) => {
  const res = await axios.get(`http://127.0.0.1:8000/mma_fight_predictor/fighter/get_stats_for_match_up?fighter_1=${name1}&fighter_2=${name2}`)
  return res;
}

const FighterService = {
  getFighterImage,
  getMatchupStats,
};

export default FighterService;
