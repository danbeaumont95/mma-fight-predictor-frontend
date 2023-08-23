/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../Styles/Landing.css';
import AnimatedValue from './AnimatedValue';
// import Logo from './Images/Beaumont AI.png';
import DarkModeSlider from './DarkModeSlider';
import { AppState } from '../redux/types';
import Button from './Button';
import Test from '../Images/ai.png';
import Computer from '../Images/first-02-12-removebg-preview.png'
import PricingCard from './PricingCard';
import { gradientCardsArray, pricingCards } from '../Helpers/constants';

interface LandingProps {
  lightModeEnabled: boolean;
}

function Landing({ lightModeEnabled }: LandingProps) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const element: any = document.querySelector('.App');
    if (element) {
      if (lightModeEnabled) {
        element.style.backgroundColor = '#fff';
      } else {
        element.style.backgroundColor = '#121212';
      }
    }
    return () => {
    };
  }, [lightModeEnabled]);

  const buttonStyle = {
    '--slist': hovered ? '#20A4F3, #2EC4B6' : '#2EC4B6, #20A4F3',
  } as React.CSSProperties;

  return (
    <div
      className="landing_main_container"
      // style={{
      //   // backgroundImage: `url(${BackgroundImage})`,
      //   backgroundImage: `url(${BackgroundImage2})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   height: '200vh',
      // }}
    >
      <DarkModeSlider />
      <div className="container">

        <div className="landing_title_and_image">

          <div className="landing_title_container">
            <div className="title_and_text">

              <h1 className={lightModeEnabled ? 'landing_title_light_mode' : 'landing_title'}>
                The
                <h1 style={{ color: '#20A4F3', fontSize: '64px' }}>future</h1>
                {' '}
                of sport prediction
              </h1>
              <h4 className={lightModeEnabled ? 'h4_light_mode' : undefined}>
                Through deep statistical analysis
                and heavy research, Dans app is showing at least 70%
                success rate on every UFC event,
                almost guaranteeing big profits to users who sign up
              </h4>
              <Button title="Sign up" backgroundColor="#20A4F3" />
            </div>

          </div>

          <div className="landing_image_container">
            <div className="image_container">

              <img src={Test} alt="Fighters" className="landing_fighters_image" />
            </div>
            {/* <img src={FightersImage} alt="Fighters" className="landing_fighters_image" /> */}
            <div className="landing_image_text_overlay" />
          </div>
        </div>
      </div>

      <div className={lightModeEnabled ? 'landing_success_rate_container_light_mode' : 'landing_success_rate_container'}>
        <h2>Current software success rate:</h2>
        <div className="landing_success_percentage">
          <AnimatedValue endValue={70} />
          %
        </div>
      </div>
      <div className="landing_card_container">

        <div className={lightModeEnabled ? 'card_light_mode' : 'card_dark'} style={{ marginRight: '40px' }}>
          <h2 className={lightModeEnabled ? 'landing_card_title_light_mode' : 'landing_card_title'}>Why use Dans app</h2>

          <div className="card-icon">
            <i className="fa-solid fa-star icon fa-2x" style={{ color: '#20A4F3' }} />
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">70% success rate</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Highly complex and accurate algorithm</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Upfront fee always won back within the first UFC event you play</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Make a second income</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Our AI has access to every single past UFC fight to base its statistical analysis on</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Makes fight day even more exciting</div>
          </div>

        </div>
        <div className={lightModeEnabled ? 'card_light_mode' : 'card_dark'} style={{ marginLeft: '40px' }}>
          <h2 className={lightModeEnabled ? 'landing_card_title_light_mode' : 'landing_card_title'}>How it works</h2>

          <div className="card-icon">
            <i className="fa-solid fa-robot icon fa-2x" style={{ color: '#20A4F3' }} />
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Choose your package</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Pay one time fee</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Get instant access to the AI predictions</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Make statistically backed bets</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Get almost guaranteed profits after the event has concluded</div>
          </div>
          <div className="list-item">
            <div className="list-icon">
              <i className="fa-solid fa-check icon fa-2x" style={{ color: '#2EC4B6' }} />
            </div>
            <div className="list-text">Repeat for each UFC event</div>
          </div>

        </div>

      </div>
      <div className="landing_button_container">
        <button
          style={buttonStyle}
          type="button"
          className="sign_up_button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Sign up now!
        </button>
      </div>
      <div className={lightModeEnabled ? 'landing_features_container_light' : 'landing_features_container_dark'}>
        <h4 style={{ textTransform: 'uppercase', paddingBottom: '30px' }}>Features</h4>
        <h1>The most in depth MMA statistical analysis AI model on the web</h1>
        <h4 style={{ fontWeight: 100 }}>As a bettor, you do not want to get left behind, sign up now to be ahead of both other bettors and the betting sites</h4>
      </div>
      <div className="gradient-cards">

        {gradientCardsArray.map((el) => (
          <div className="card" id={el.title}>
            <div className="container-card bg-green-box" style={lightModeEnabled ? { backgroundColor: '#f8f8f8' } : { backgroundColor: 'black' }}>
              <div className="icon_container">
                <i
                  className={el.icon}
                  style={{ color: '#20A4F3' }}
                />
              </div>

              <p className="card-title" style={lightModeEnabled ? { color: 'black' } : undefined}>{el.title}</p>
              <p className="card-description" style={lightModeEnabled ? { color: '#878585' } : undefined}>{el.about}</p>
            </div>
          </div>

        ))}
      </div>
      <div className="rtl_container">
        <div className="mac_image_container">
          <img src={Computer} alt="" className="computer" />
        </div>
        <div className="events_container">
          <div className="icon_container">
            <i
              className="fa-solid fa-star icon fa-2x"
              style={{ color: '#20A4F3' }}
            />
          </div>

          <h1>All event fights in details</h1>
          <h4>Our modal has in depth statistics for each for on the next upcoming UFC card. The default fight stats available are match-up stats (record, style etc) and head to head stats(strikes landed per min, striking accuracy etc) and with our premium plan we offer premium stats (wins against opponent style, wins agains opponent stance)</h4>
          <Button title="Get started" backgroundColor="#20A4F3" width={210} />

        </div>
      </div>
      <div className="landing_pricing_container">

        <h4 style={{ textTransform: 'uppercase', paddingBottom: '30px', marginTop: '100px' }}>Pricing</h4>
        <h1>Pricing plans</h1>

        <div className="pricing_cards_container">

          {pricingCards.map((el) => (
            <PricingCard title={el.title} description={el.description} fee={el.fee} included={el.included} />
          ))}
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  lightModeEnabled: state.lightModeEnabled,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
