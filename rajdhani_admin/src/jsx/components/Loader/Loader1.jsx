import React, { useEffect, useState } from "react";
import "./Loader1.css";

const Loader1 = ({ visible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev; // Stop at 98%, finish at API completion
        return prev + 1;
      });
    }, 1000); // Speed of progress

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="progress-loader-overlay">
      <div className="progress-loader-box">
        <img
          src={require("../../../assets/images/rajdhani.png")}
          alt="Logo"
          className="loader-logo"
        />
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default Loader1;
