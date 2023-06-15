import React, { useEffect, useState } from 'react';
import DefaultProfileImage from '../Images/standing-stance-left-silhouette.png';
import EventService from '../Services/events';
import UpcomingEvent from '../Interfaces/Events';
import '../Styles/UpcomingEvents.css';
import FighterService from '../Services/fighters';

function UpcomingEvents() {
  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent>({ link: '', name: '' });
  const [fightsAndWinners, setFightsAndWinners] = useState<any>([])
  const [fightersImagesState, setFightersImagesState] = useState<any>({})
  const [nextEventPoster, setNextEventPoster] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await EventService.getUpcomingEvents();
        if (res.data.data) {
          const { data: { data } } = res;
          setUpcomingEvent(data[0]);
          const resx = await EventService.getFightsForEvent(data[0]);
          if (resx.data.data.length) {
            const { data: { data: event } } = resx;
            await Promise.all(event.map(async (el: any) => {
              const resz = await EventService.getBasicFightStatsForFight(el.link);
              const { data: { data: basicStats } } = resz;
              const fighter1 = Object.keys(basicStats.Height)[0];
              const fighter2 = Object.keys(basicStats.Height)[1];
              const { count, winner } = basicStats;
              const newData = {
                fighter1,
                fighter2,
                count,
                winner,
              };

              setFightsAndWinners((prevState: any) => [...prevState, newData]);
            }));
          }
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (exx) {
        console.error('Error:', exx);
        setError(true);
        setLoading(false);
      }
    }

    async function getNextEventPoster() {
      EventService.getNextEventPoster()
        .then((res) => {
          const { data: { data } } = res;
          setNextEventPoster(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchData();
    getNextEventPoster()
  }, []);

  useEffect(() => {
    async function fetchFighterImages() {
      try {
        const fighters: any = fightsAndWinners
          .map((fight: any) => [fight.fighter1, fight.fighter2]);
        const uniqueFighters = [...new Set(fighters.flat())];
        const fightersImages: any = {};

        uniqueFighters.forEach((fighter: any) => {
          const ufcFighterName = fighter.split(' ').join('-')
          FighterService.getFighterImage(ufcFighterName)
            .then((res: any) => {
              if (res.data.data) {
                fightersImages[fighter] = res.data.data;

                setFightersImagesState((prevState: any) => ({
                  ...prevState,
                  [fighter]: res.data.data,
                }));
              }
            })
            .catch((er) => {
              console.log(er, 'er111')
            })
        })
      } catch (ex) {
        console.error('Error fetching fighter images:', ex);
      }
    }

    if (fightsAndWinners.length > 0 && !loading) {
      fetchFighterImages();
    }
  }, [fightsAndWinners]);

  if (error) return <h1>Unable to fetch upcoming event. Please try again later.</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div style={{ color: 'white' }}>
      <img src={nextEventPoster} alt="next event poster" className="event_poster" />

      <h1 className="upcoming_event_title">

        {upcomingEvent.name}
      </h1>

      <div className="upcoming_events_container">
        {Array.from(new Set(fightsAndWinners.map((obj: any) => JSON.stringify(obj, null, 2))))
          .map((str: any) => JSON.parse(str)).map((el: any) => {
            const countValues: any = Object.values(el.count);
            const totalCount: any = countValues.reduce((acc: any, curr: any) => acc + curr, 0);

            const percentage1 = (countValues[0] / totalCount) * 100;

            const percentage2 = (countValues[1] / totalCount) * 100;

            const threshold = 20;

            let winner = 'No clear winner';
            if (percentage1 >= percentage2 + threshold) {
              winner = `Predicted winner: ${el.fighter1}`;
            } else if (percentage2 >= percentage1 + threshold) {
              winner = `Predicted winner: ${el.fighter2}`;
            }

            return (
              <div className="upcoming_events_fight_container">
                <div className="fighters_container">
                  <div className="fighter_1_container">
                    <span className="fighter_name">{el.fighter1}</span>
                    {/* <span>

                      (
                      {((el.count[el.fighter1] / totalCount) * 100).toFixed(2)}
                      %)
                    </span> */}
                  </div>
                  <div className="vs fighter_name">
                    <p>VS</p>
                  </div>

                  <div className="fighter_2_container">
                    <span className="fighter_name">{el.fighter2}</span>

                  </div>
                </div>
                <div className="percentage_container">
                  <div className="fighter_1_percentage_container">

                    <span className="percentage_win">

                      (
                      {((el.count[el.fighter1] / totalCount) * 100).toFixed(2)}
                      %)
                    </span>

                  </div>
                  <div />
                  <div className="fighter_2_percentage_container">

                    <span className="percentage_win">

                      (
                      {((el.count[el.fighter2] / totalCount) * 100).toFixed(2)}
                      %)
                    </span>

                  </div>
                </div>
                <div className="fighter_image_container">
                  <div className="fighter_1_percentage_container">

                    {fightersImagesState[el.fighter1] && typeof (fightersImagesState[el.fighter1]) === 'string' ? (

                      <img src={fightersImagesState[el.fighter1]} alt="" style={{ height: '140px', width: '100px' }} />
                    ) : (
                      <img src={DefaultProfileImage} alt="" style={{ height: '140px', width: '100px' }} />

                    )}
                  </div>
                  <div />
                  <div className="fighter_2_percentage_container">

                    {fightersImagesState[el.fighter2] && typeof (fightersImagesState[el.fighter2]) === 'string' ? (

                      <img src={fightersImagesState[el.fighter2]} alt="" style={{ height: '140px', width: '100px' }} />
                    ) : (
                      <img src={DefaultProfileImage} alt="" style={{ height: '140px', width: '100px' }} />

                    )}
                  </div>
                </div>
                <div className="winner_container">
                  <div className="winner">
                    <h3>{winner}</h3>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

    </div>
  );
}

export default UpcomingEvents;
