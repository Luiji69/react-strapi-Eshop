import React from 'react';
import './HowItWorks.scss';
import aaaa1 from '../../assets/aaaa1.png';
import bb from '../../assets/bb.png';
import cc from '../../assets/cc.png';

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h2>How it works</h2>
      <div className="step-container">
        <div className="step">
          <div className="step-number">Join</div>
          <div className="step-description">
            Sign up for a free account in less than 30 seconds.
          </div>
          <div className="step-image">
            <img src={aaaa1} alt="Sign up and create your account" />
          </div>
        </div>
        <div className="step">
          <div className="step-number">Shop</div>
          <div className="step-description">
            Browse and shop from your favorite stores
          </div>
          <div className="step-image">
            <img src={bb} alt="Sign up and create your account" />
          </div>
        </div>
        <div className="step">
          <div className="step-number">Go green</div>
          <div className="step-description">
            Be the change you wish to see in the world
          </div>
          <div className="step-image">
            <img src={cc} alt="Sign up and create your account" />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default HowItWorks;
