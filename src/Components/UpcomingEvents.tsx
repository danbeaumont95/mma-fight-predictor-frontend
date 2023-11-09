/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DefaultProfileImage from '../Images/standing-stance-left-silhouette.png';
import EventService from '../Services/events';
import UpcomingEvent, {
  BasicEventDetails, FightAndWinner, FighterBasicFightStats,
  FighterMatchupStatistic, FighterRecordAgainstOpponentAndStyle,
} from '../Interfaces/Events';
import '../Styles/UpcomingEvents.css';
import FighterService from '../Services/fighters';
import FullPageLoader from './FullPageLoader';
import { useAuth } from './AuthContext';
import UserService from '../Services/user';
import PurchaseService from '../Services/purchase';
import { ProgressBar } from './ProgressBar';
// import { handleCheckout } from '../Helpers/stripe';

function UpcomingEvents() {
  const [haveCheckedAccessToken, setHaveCheckedToken] = useState(false)
  const user = useSelector((state: any) => state.user);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  if (!haveCheckedAccessToken) {
    console.log('ifblock')
    if (!accessToken) {
      navigate('/signup');
    } else {
      const { email } = user;
      UserService.checkAccessToken(accessToken, email)
        .then((res: any) => {
          if (res.data.message !== 'Success!') {
            toast.error('Error! Please log in again')
            navigate('/signup');
          }
        })
      PurchaseService.hasUserPurchasedEvent('test', accessToken)
        .then((res) => {
          if (res.data.data === false) {
            toast.error('Error! Event not purchased. You will now be navigated to buy this event')
            // const fee = '£5.00'
            // handleCheckout({ fee, email })
          } else if (res.data.data === true) {
            console.log('purchase found.')
          }
        })
        .catch(() => {
          toast.error('Error! Unable to get purchase. Please try again later.')
        })
        .finally(() => {
          setHaveCheckedToken(true)
        })
    }
  }

  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent>({ link: '', name: '' });
  const [fightsAndWinners, setFightsAndWinners] = useState<FightAndWinner[]>([])
  const [fightersImagesState, setFightersImagesState] = useState<{[key: string]: string}>({});
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [fighterWeightClass, setFighterWeightClass] = useState<{[key: string]: string}>({});
  const [fighterMatchupStats, setFighterMatchupstats] = useState<{
    [key: string]: FighterMatchupStatistic
  }>({})
  const [nextEventPoster, setNextEventPoster] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loadingEvents, setLoadingEvents] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [loadingStats, setLoadingStats] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [loadingImages, setLoadingImages] = useState(false)
  const [amountOfFightEventsLoading, setAmountOfFightEventsLoading] = useState(0)
  const [amountOfFightStatsLoading, setAmountOfFightStatsLoading] = useState(0)
  const [amountOfImagesLoading, setAmountOfImagesLoading] = useState(0)
  const [amountOfImages, setAmountOfImages] = useState(0)
  const [filteredStat, setFilteredStat] = useState('Matchup Stats')
  const [fighterBasicFightStats, setFighterBasicFightStats] = useState<{
    [key: string]: FighterBasicFightStats
  }>({})
  const [inDepthStatsAgainstOpponentAndStyle, setInDepthStatsAgainstOpponentAndStyle] = useState<{
    [key: string]: FighterRecordAgainstOpponentAndStyle
  }>({})
  const [allFighterImagesLoaded, setAllFighterImagesLoaded] = useState(false)

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
            const sortedFights = event.map((el: BasicEventDetails, index: number) => ({
              ...el,
              index,
            }));
            setLoadingEvents(false)
            setAmountOfFightEventsLoading(1)
            setLoadingStats(true)
            await Promise.all(sortedFights.map(async (el: BasicEventDetails, i: number) => {
              const resz = await EventService.getBasicFightStatsForFight(el.link);
              setAmountOfFightStatsLoading(i)
              const { data: { data: basicStats } } = resz;
              const fighter1 = Object.keys(basicStats.Height)[0];
              const fighter2 = Object.keys(basicStats.Height)[1];
              const { count, winner } = basicStats;
              const newData = {
                fighter1,
                fighter2,
                count,
                winner,
                index: el.index, // Keep track of the original index
              };
              setFighterWeightClass((prevState) => ({
                ...prevState,
                [fighter1]: el.weight_class,
              }));

              setFightsAndWinners((prevState) => [...prevState, newData]);
              setFighterBasicFightStats((prevState) => ({
                ...prevState,
                [fighter1]: basicStats,
              }));
            }));
            setLoadingStats(false)
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
    let isMounted = true;

    async function fetchFighterImages() {
      try {
        const fighters = fightsAndWinners
          .map((fight) => [fight.fighter1, fight.fighter2]);
        const uniqueFighters = [...new Set(fighters.flat())];

        const fightersImages: {[key: string]: string} = {};
        setLoadingImages(true)

        await Promise.all(
          uniqueFighters.map(async (fighter, i: number) => {
            setAmountOfImagesLoading(i)
            const ufcFighterName = fighter.split(' ').join('-');
            try {
              const res = await FighterService.getFighterImage(ufcFighterName);
              if (res.data.data) {
                fightersImages[fighter] = res.data.data;

                if (isMounted) {
                  setFightersImagesState((prevState) => ({
                    ...prevState,
                    [fighter]: res.data.data,
                  }));
                }
              }
            } catch (er) {
              console.log(er, 'er111');
            }
          }),
        );
        setAmountOfImages(uniqueFighters.length)
        setLoadingImages(false)

        if (isMounted) {
          setAllFighterImagesLoaded(true);
        }
      } catch (ex) {
        console.error('Error fetching fighter images:', ex);
      }
    }

    if (fightsAndWinners.length > 0 && !loading && !allFighterImagesLoaded) {
      fetchFighterImages();
    }

    return () => {
      isMounted = false;
    };
  }, [fightsAndWinners, loading, allFighterImagesLoaded]);

  useEffect(() => {
    FighterService.getMostPopularFightStyles()
      .then((res) => {
        console.log(res, 'res123123321')
      })
  }, [])

  const getPercentage = (val: number) => {
    const percentage = (val * 100).toFixed(0);
    return `${percentage}%`;
  }

  const handleContainerClick = (name: string, name2: string) => {
    if (expandedSections.indexOf(name) > -1) {
      setExpandedSections(expandedSections.filter((el) => el !== name))
    } else {
      setExpandedSections([...expandedSections, name])
      FighterService.getMatchupStats(name, name2)
        .then((res) => {
          if (res.data.data) {
            setFighterMatchupstats((prevState) => ({
              ...prevState,
              [name]: res.data.data.fighter_1_stats,
              [name2]: res.data.data.fighter_2_stats,
            }))
          }
        })
      EventService.getInDepthStats(name, name2)
        .then((res) => {
          if (res.data.data) {
            setInDepthStatsAgainstOpponentAndStyle((prevState) => ({
              ...prevState,
              [name]: res.data.data,
            }))
          }
        })
    }
  }

  const fightersSection = (el: FightAndWinner) => (
    <div className="fighters_container" onClick={() => handleContainerClick(el.fighter1, el.fighter2)}>
      <div className="fighter_1_container">
        <span className="fighter_name">{el.fighter1}</span>

      </div>
      <div className="vs fighter_name">
        {expandedSections.indexOf(el.fighter1) < 0 ? (
          <p>VS</p>
        ) : (
          <p>{fighterWeightClass[el.fighter1]}</p>
        )}
      </div>

      <div className="fighter_2_container">
        <span className="fighter_name">{el.fighter2}</span>

      </div>
    </div>
  );

  const matchupStats = (el: FightAndWinner) => (
    <>
      <div className="dans_class red">
        <div>{fighterBasicFightStats[el.fighter1]?.['Wins/Losses/Draws'][el.fighter1]}</div>
      </div>
      <div className="dans_class border">
        <div className="stat_title">Record</div>
      </div>
      <div className="dans_class blue">
        <div>{fighterBasicFightStats[el.fighter1]?.['Wins/Losses/Draws'][el.fighter2]}</div>
      </div>

      <div className="dans_class red">
        <div>{fighterMatchupStats[el.fighter1]?.Style ?? 'n/a'}</div>
      </div>
      <div className="dans_class border">
        <div className="stat_title">Style</div>
      </div>
      <div className="dans_class blue">

        <div>{fighterMatchupStats[el.fighter1]?.Style ?? 'n/a'}</div>
      </div>

      <div className="dans_class red">
        {/* <div>Red</div> */}
        <div>{fighterBasicFightStats[el.fighter1]?.Height[el.fighter1]}</div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Height</div>
      </div>
      <div className="dans_class blue">

        <div>{fighterBasicFightStats[el.fighter1]?.Height[el.fighter2]}</div>

      </div>
      <div className="dans_class red">
        {/* <div>Red</div> */}
        <div>{fighterBasicFightStats[el.fighter1]?.Reach[el.fighter1]}</div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Reach</div>
      </div>
      <div className="dans_class blue">

        <div>{fighterBasicFightStats[el.fighter1]?.Reach[el.fighter2]}</div>

      </div>
      <div className="dans_class red">
        {/* <div>Red</div> */}
        <div>{fighterBasicFightStats[el.fighter1]?.DOB[el.fighter1]}</div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">DoB</div>
      </div>
      <div className="dans_class blue">

        <div>{fighterBasicFightStats[el.fighter1]?.DOB[el.fighter2]}</div>

      </div>
    </>

  )

  const headToHeadStats = (el: FightAndWinner) => (
    <>
      <div className="dans_class red">
        {/* <div>
          {fighterBasicFightStats[el.fighter1]['Average Fight Time'][el.fighter1]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1]['Average Fight Time']
            ? fighterBasicFightStats[el.fighter1]['Average Fight Time'][el.fighter1]
            : '--'}
        </div>
      </div>
      <div className="dans_class border">
        <div className="stat_title">Average Fight Time</div>
      </div>
      <div className="dans_class blue">

        {/* <div>
          {fighterBasicFightStats[el.fighter1]['Average Fight Time'][el.fighter2]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1]['Average Fight Time']
            ? fighterBasicFightStats[el.fighter1]['Average Fight Time'][el.fighter2]
            : '--'}
        </div>
      </div>

      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.Defense[el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Defence</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.Defense[el.fighter2]}
        </div>
      </div>

      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Most recent fights (Newest First)'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Most recent fights (Newest first)</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Most recent fights (Newest First)'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        {/* <div>
          {fighterBasicFightStats[el.fighter1]?.Reach[el.fighter1]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1].Reach
            ? fighterBasicFightStats[el.fighter1].Reach[el.fighter1]
            : '--'}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Reach</div>
      </div>
      <div className="dans_class blue">

        {/* <div>
          {fighterBasicFightStats[el.fighter1]?.Reach[el.fighter2]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1].Reach
            ? fighterBasicFightStats[el.fighter1].Reach[el.fighter2]
            : '--'}
        </div>
      </div>
      <div className="dans_class red">
        {/* <div>
          {fighterBasicFightStats[el.fighter1]?.Stance[el.fighter1]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1].Stance
            ? fighterBasicFightStats[el.fighter1].Stance[el.fighter1]
            : '--'}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Stance</div>
      </div>
      <div className="dans_class blue">

        {/* <div>
          {fighterBasicFightStats[el.fighter1]?.Stance[el.fighter2]}
        </div> */}
        <div>
          {fighterBasicFightStats[el.fighter1] && fighterBasicFightStats[el.fighter1].Stance
            ? fighterBasicFightStats[el.fighter1].Stance[el.fighter2]
            : '--'}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Strikes Absorbed per Min. (SApM)'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Strikes Absorbed per Min. (SApM)</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Strikes Absorbed per Min. (SApM)'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Strikes Landed per Min. (SLpM)'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Strikes Landed per Min. (SLpM)</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Strikes Landed per Min. (SLpM)'][el.fighter2]}
        </div>
      </div>

      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Striking Accuracy'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Striking Accuracy</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Striking Accuracy'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Submission Average/15 min.'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Submission Average/15 min</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Submission Average/15 min.'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedown Accuracy'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Takedown Accuracy</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedown Accuracy'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedown Defense'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Takedown Defence</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedown Defense'][el.fighter2]}
        </div>
      </div>
      <div className="dans_class red">
        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedowns Average/15 min.'][el.fighter1]}
        </div>

      </div>
      <div className="dans_class border">
        <div className="stat_title">Takedowns Average/15 min</div>
      </div>
      <div className="dans_class blue">

        <div>
          {fighterBasicFightStats[el.fighter1]?.['Takedowns Average/15 min.'][el.fighter2]}
        </div>
      </div>
    </>
  )

  const opponentStyleStats = (el: FightAndWinner) => (
    !inDepthStatsAgainstOpponentAndStyle[el.fighter1] ? null : (

      <>
        <div className="dans_class red">
          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1].fighter_1_record_against_fighter_2 ?? 'False'}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Have fought before</div>
        </div>
        <div className="dans_class blue">

          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1].fighter_2_record_against_fighter_1 ?? 'False'}
          </div>
        </div>
        {inDepthStatsAgainstOpponentAndStyle[el.fighter1].fighter_1_record_against_fighter_2 ? (
          <>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .fighter_with_more_wins_over_other === el.fighter1 ? (
                <div className="dans_class red">
                  <div>
                    {inDepthStatsAgainstOpponentAndStyle[el.fighter1].fighter_1_record_against_fighter_2 ?? 'False'}
                  </div>
                </div>
              ) : (
                <div className="dans_class red">
                  <div />
                </div>
              )}

            <div className="dans_class border">
              <div className="stat_title">Have fought before</div>
            </div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .fighter_with_more_wins_over_other === el.fighter2 ? (
                <div className="dans_class blue">
                  <div>
                    {inDepthStatsAgainstOpponentAndStyle[el.fighter1].fighter_1_record_against_fighter_2 ?? 'False'}
                  </div>
                </div>
              ) : (
                <div className="dans_class blue">
                  <div />
                </div>
              )}

          </>
        ) : null}
        <div className="dans_class red">
          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_times_fighter_1_has_fought_fighter_2_style}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Amount of times fighter has fought opponents with same style</div>
        </div>
        <div className="dans_class blue">

          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_times_fighter_2_has_fought_fighter_1_style}
          </div>
        </div>

        <div className="dans_class red">
          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_wins_fighter_1_has_against_fighter_2_style}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Amount of wins fighter has over opponent style</div>
        </div>
        <div className="dans_class blue">

          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_wins_fighter_2_has_against_fighter_1_style}
          </div>
        </div>
        <div className="dans_class red">
          <div>
            {getPercentage(inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .percentage_of_wins_fighter_1_has_against_fighter_2_style)}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Percentage wins fighter has over opponent style</div>
        </div>
        <div className="dans_class blue">

          <div>
            {getPercentage(inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .percentage_of_wins_fighter_2_has_against_fighter_1_style)}
          </div>
        </div>

        <div className="dans_class red">
          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_times_fighter_1_has_fought_fighter_2_stance}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Amount of times fighter has fought opponent stance</div>
        </div>
        <div className="dans_class blue">

          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_times_fighter_2_has_fought_fighter_1_stance}
          </div>
        </div>

        <div className="dans_class red">
          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_wins_fighter_1_has_against_fighter_2_stance}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Amount of wins fighter has over opponent fighter stance</div>
        </div>
        <div className="dans_class blue">

          <div>
            {inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .amount_of_wins_fighter_2_has_against_fighter_1_stance}
          </div>
        </div>

        <div className="dans_class red">
          <div>
            {getPercentage(inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .percentage_of_wins_fighter_1_has_against_fighter_2_stance)}
          </div>

        </div>
        <div className="dans_class border">
          <div className="stat_title">Percentage wins fighter has over opponent fighter stance</div>
        </div>
        <div className="dans_class blue">

          <div>
            {getPercentage(inDepthStatsAgainstOpponentAndStyle[el.fighter1]
              .percentage_of_wins_fighter_2_has_against_fighter_1_stance)}
          </div>
        </div>
      </>
    ))

  const getStats = (el: FightAndWinner) => {
    switch (filteredStat) {
      case 'Matchup Stats':
        return matchupStats(el)
      case 'Head to Head':
        return headToHeadStats(el)
      case 'Stats against opponent/style':
        return opponentStyleStats(el)
      default:
        return matchupStats(el);
    }
  }

  if (error) return <h1>Unable to fetch upcoming event. Please try again later.</h1>;

  if (loading) {
    return (
      <section style={{ position: 'relative', height: '100vh' }}>
        <div className="custom-shape-divider-top-1699563146">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
          </svg>

          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
          }}
          >
            <ProgressBar value={amountOfFightEventsLoading} max={1} text="Loading events" />
            <ProgressBar value={amountOfFightStatsLoading} max={12} text="Loading stats" />
            <ProgressBar value={amountOfImagesLoading} max={amountOfImages} text="Loading images" />
          </div>
        </div>
      </section>
    )
  }

  // if (!allFighterImagesLoaded) return <FullPageLoader />

  console.log(fighterBasicFightStats, 'fighterBasicFightStats1')

  return (
    <div style={{ color: 'white' }}>
      <img src={nextEventPoster} alt="next event poster" className="event_poster" />
      <h1 className="upcoming_event_title">
        {upcomingEvent.name}
      </h1>

      <div className="upcoming_events_container">
        {fightsAndWinners
          .sort((a, b) => a.index - b.index)
          .map((elx) => {
            const el: FightAndWinner = JSON.parse(JSON.stringify(elx, null, 2))
            const countValues = Object.values(el.count);
            const totalCount = countValues.reduce((acc, curr) => acc + curr, 0);
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
              <div className={(filteredStat === 'Head to Head' || filteredStat === 'Stats against opponent/style') && expandedSections.indexOf(el.fighter1) > -1 ? 'upcoming_events_fight_container_large' : 'upcoming_events_fight_container'} onClick={expandedSections.indexOf(el.fighter1) > -1 ? undefined : () => handleContainerClick(el.fighter1, el.fighter2)}>
                {expandedSections.indexOf(el.fighter1) < 0 ? (
                  <>
                    {fightersSection(el)}
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

                          <img
                            // src={fightersImagesState[el.fighter1]}
                            src={`data:image/jpeg;base64,${fightersImagesState[el.fighter1]}`}
                            alt=""
                            style={{ height: '140px', width: '100px' }}

                          />
                        ) : (
                          <img src={DefaultProfileImage} alt="" style={{ height: '140px', width: '100px' }} />

                        )}
                      </div>
                      <div />
                      <div className="fighter_2_percentage_container">

                        {fightersImagesState[el.fighter2] && typeof (fightersImagesState[el.fighter2]) === 'string' ? (

                          <img
                            src={`data:image/jpeg;base64,${fightersImagesState[el.fighter2]}`}
                            alt=""
                            style={{ height: '140px', width: '100px' }}
                          />
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
                  </>
                ) : (
                  <>
                    {fightersSection(el)}
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
                    <div className={filteredStat === 'Head to Head' || filteredStat === 'Stats against opponent/style' ? 'fighter_image_container_large' : 'fighter_image_container'}>
                      <div className="fighter_1_percentage_container">

                        {fightersImagesState[el.fighter1] && typeof (fightersImagesState[el.fighter1]) === 'string' ? (

                          <img
                            src={`data:image/jpeg;base64,${fightersImagesState[el.fighter1]}`}
                            alt=""
                            style={{
                              height: '90%', width: '90%', display: 'block', margin: 'auto',
                            }}
                          />
                        ) : (
                          <img
                            src={DefaultProfileImage}
                            alt=""
                            style={{
                              height: '90%', width: '90%', display: 'block', margin: 'auto',
                            }}
                          />

                        )}
                      </div>
                      <div className="opened_container">
                        <div className="dans_class" style={{ marginBottom: '20px', gap: '10px' }}>
                          <div className="match_up_stats" style={filteredStat === 'Matchup Stats' ? { fontWeight: 'bold', textDecoration: 'underline' } : undefined} onClick={() => setFilteredStat('Matchup Stats')}>Matchup Stats</div>
                          {fighterBasicFightStats[el.fighter1] ? (

                            <div className="head_to_head" style={filteredStat === 'Head to Head' ? { fontWeight: 'bold', textDecoration: 'underline' } : undefined} onClick={() => setFilteredStat('Head to Head')}>Head to Head</div>
                          ) : <i className="fas fa-circle-notch fa-spin" style={{ height: 'fit-content', width: 'fit-content' }} />}
                          {inDepthStatsAgainstOpponentAndStyle[el.fighter1] ? (

                            <div className="stats_against_opponent" style={filteredStat === 'Stats against opponent/style' ? { fontWeight: 'bold', textDecoration: 'underline' } : undefined} onClick={() => setFilteredStat('Stats against opponent/style')}>Stats against opponent/style</div>
                          ) : <i className="fas fa-circle-notch fa-spin" style={{ height: 'fit-content', width: 'fit-content' }} />}
                        </div>
                        {getStats(el)}
                      </div>
                      <div className="fighter_2_percentage_container">

                        {fightersImagesState[el.fighter2] && typeof (fightersImagesState[el.fighter2]) === 'string' ? (

                          <img
                            src={`data:image/jpeg;base64,${fightersImagesState[el.fighter2]}`}
                            alt=""
                            style={{
                              height: '90%', width: '90%', display: 'block', margin: 'auto',
                            }}
                          />
                        ) : (
                          <img
                            src={DefaultProfileImage}
                            alt=""
                            style={{
                              height: '90%', width: '90%', display: 'block', margin: 'auto',
                            }}
                          />

                        )}
                      </div>
                    </div>
                    <div className="winner_container">
                      <div className="winner">
                        <h3>{winner}</h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>

    </div>
  );
}

export default UpcomingEvents;
