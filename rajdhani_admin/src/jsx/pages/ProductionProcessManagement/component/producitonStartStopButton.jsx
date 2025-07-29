import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import './ProductionStartStopButton.css';

const ProductionStartStopButton = ({
  isRunning,
  isPaused,
  onStartRequest,
  onStopRequest,
  onResumeRequest,
}) => {
  const handleClick = () => {
    if (!isRunning) {
      onStartRequest(); // first time start
    } else if (isPaused) {
      onResumeRequest(); // resume from pause
    } else {
      onStopRequest(); // stop or pause options
    }
  };

  const label = !isRunning
    ? 'START'
    : isPaused
    ? 'RESUME'
    : 'Finalize or Pause';

  return (
    <button
      className={`switch-button ${isRunning ? 'active' : 'inactive'} ${isPaused ? 'paused' : ''}`}
      onClick={handleClick}
    >
      <FaPowerOff className={`icon ${isRunning && !isPaused ? 'spin' : ''}`} />
      <span className="label">{label}</span>
    </button>
  );
};

export default ProductionStartStopButton;
