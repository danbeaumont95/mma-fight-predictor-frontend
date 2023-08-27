import axios from 'axios';
import { url } from './url'

const getUpcomingEvents = async () => {
  const res = await axios.get(`${url}/mma_fight_predictor/events/`);
  return res;
};

const getFightsForEvent = async (event: string) => {
  const res = await axios.post(`${url}/mma_fight_predictor/events/get_event_details`, {
    event_url: event,
  });
  return res;
};

const getBasicFightStatsForFight = async (fight: string) => {
  const res = await axios.post(`${url}/mma_fight_predictor/events/get_basic_fight_stats`, {
    fight_url: fight,
  });
  return res;
};

const getNextEventPoster = async () => {
  const res = await axios.get(`${url}/mma_fight_predictor/events/get_next_event_poster`)
  return res
}

const getInDepthStats = async (fighter_1: string, fighter_2: string) => {
  const res = await axios.get(`${url}/mma_fight_predictor/events/get_in_depth_stats?fighter_1=${fighter_1}&fighter_2=${fighter_2}`);
  return res;
}

const EventService = {
  getUpcomingEvents,
  getFightsForEvent,
  getBasicFightStatsForFight,
  getNextEventPoster,
  getInDepthStats,
};

export default EventService;
