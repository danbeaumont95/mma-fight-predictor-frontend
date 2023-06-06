import React, { useState } from 'react';
import FightersImage from './Images/fighters.png';
import './Styles/Landing.css';
import AnimatedValue from './Components/AnimatedValue';

function Landing() {
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    '--slist': hovered ? '#20A4F3, #2EC4B6' : '#2EC4B6, #20A4F3',
  } as React.CSSProperties;

  return (
    <div className="landing_main_container">
      <div className="landing_title_and_image">

        <div className="landing_title_container">

          <h1 className="landing_title">
            The
            <h1 style={{ color: '#20A4F3', fontSize: '64px' }}>future</h1>
            {' '}
            of sport prediction
          </h1>
          <h4>
            Through deep statistical analysis
            and heavy research, Dans app is showing at least 70%
            success rate on every UFC event, almost guaranteeing big profits to users who sign up
          </h4>
        </div>
        {/* <i className="fa-solid fa-star icon fa-2x" style={{ backgroundColor: 'white' }} /> */}

        <div className="landing_image_container">
          <img src={FightersImage} alt="Fighters" className="landing_fighters_image" />
          <div className="landing_image_text_overlay">
            {/* <h2>Lorem ipsum and all that</h2> */}
          </div>
        </div>
      </div>
      {/* <div className="landing_statistics_container">
        <div>

          <h1>70% success rate</h1>
          <i className="fa-solid fa-star icon fa-2x" style={{ backgroundColor: 'white' }} />
        </div>
        <div>

          <h1>70% success rate</h1>
          <i className="fa-solid fa-star icon fa-2x" style={{ backgroundColor: 'white' }} />
        </div>
        <div>

          <h1>70% success rate</h1>
          <i className="fa-solid fa-star icon fa-2x" style={{ backgroundColor: 'white' }} />
        </div>
      </div> */}
      <div className="landing_success_rate_container">
        <h2>Current software success rate:</h2>
        <div className="landing_success_percentage">

          {/* <h4> */}
          <AnimatedValue endValue={70} />
          %
          {/* </h4> */}
        </div>
      </div>
      <h2>Make money betting on UFC</h2>
      <div className="landing_card_container">

        <div className="card" style={{ marginRight: '40px' }}>
          <h2 className="landing_card_title">Why use Dans app</h2>

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
        <div className="card" style={{ marginLeft: '40px' }}>
          <h2 className="landing_card_title">How it works</h2>

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
        {/* <button type="button" className="sign_up_button">Sign up now!</button> */}
        <button
          // data-ico="👻"
          style={buttonStyle}
          // onClick={handleClick}
          type="button"
          className="sign_up_button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Sign up now!
        </button>
      </div>
    </div>
  );
}

export default Landing;
