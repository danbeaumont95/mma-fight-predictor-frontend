import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FightersImage from './Images/fighters.png';
import './Styles/Landing.css';
import AnimatedValue from './Components/AnimatedValue';
import Logo from './Images/Beaumont AI.png';
import DarkModeSlider from './Components/DarkModeSlider';
import { AppState } from './redux/types';

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
    <div className="landing_main_container">
      <DarkModeSlider />

      <div className="landing_title_and_image">

        <div className="landing_title_container">

          <h1 className={lightModeEnabled ? 'landing_title_light_mode' : 'landing_title'}>
            The
            <h1 style={{ color: '#20A4F3', fontSize: '64px' }}>future</h1>
            {' '}
            of sport prediction
          </h1>
          <h4 className={lightModeEnabled ? 'h4_light_mode' : undefined}>
            Through deep statistical analysis
            and heavy research, Dans app is showing at least 70%
            success rate on every UFC event, almost guaranteeing big profits to users who sign up
          </h4>
        </div>

        <div className="landing_image_container">
          <img src={FightersImage} alt="Fighters" className="landing_fighters_image" />
          <div className="landing_image_text_overlay" />
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

        <div className={lightModeEnabled ? 'card_light_mode' : 'card'} style={{ marginRight: '40px' }}>
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
        <div className={lightModeEnabled ? 'card_light_mode' : 'card'} style={{ marginLeft: '40px' }}>
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
      <div className={lightModeEnabled ? 'landing_about_container_light_mode' : 'landing_about_container'}>
        <h1>#1 MMA prediction app</h1>
        <p>
          Dans app is a comprehensive platform that combines a vast database
          of past event data with advanced predictive algorithms,
          empowering users to make informed predictions and stay ahead of the curve
          in the world of mixed martial arts.
          {'\n'}
          {'\n'}
          At the core of our app lies an extensive collection of historical UFC event data,
          encompassing fight results, detailed statistics, and crucial performance metrics.
          With just a few clicks, users can dive deep into the fighting careers of
          their favorite athletes, exploring their records, past performances,
          and even uncovering hidden patterns and trends. This wealth of information
          serves as a solid foundation for making accurate predictions about future fights.
          {'\n'}
          {'\n'}
          So, why wait? Join our community of UFC aficionados and unlock the power
          of data-driven predictions. Explore the fascinating world of
          MMA like never before, make informed decisions, and bask in the
          thrill of accurate fight predictions with our groundbreaking UFC
          event data and prediction web app.
        </p>
      </div>
      <div className="landing_logo_container">
        <img src={Logo} alt="logo" />
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
