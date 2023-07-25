import React from 'react';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../redux/actions';
import { AppState } from '../redux/types';

interface DarkModeSliderProps {
  lightModeEnabled: boolean;
  toggleDarkMode: () => void;
}

function DarkModeSlider({ lightModeEnabled, toggleDarkMode: toggle }: DarkModeSliderProps) {
  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={lightModeEnabled}
          onChange={toggle}
        />
        <div className="slider round" />
      </label>
      {lightModeEnabled ? (

        <em>Enable Dark Mode!</em>
      ) : <em style={{ color: '#ffffff' }}>Enable Light Mode!</em>}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  lightModeEnabled: state.lightModeEnabled,
});

const mapDispatchToProps = {
  toggleDarkMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeSlider);
