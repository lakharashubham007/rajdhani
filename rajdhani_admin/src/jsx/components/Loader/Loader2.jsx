import React, { useEffect, useState } from "react";
import "./Loader2.css";

const Loader2 = ({ visible, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  // Starts loader and progress bar
  useEffect(() => {
    if (visible) {
      setShow(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return prev;
          return prev + 1;
        });
      }, 25);

      return () => clearInterval(interval);
    }
  }, [visible]);

  // Complete to 100% and hide when visible becomes false
  useEffect(() => {
    if (!visible && show && progress < 100) {
      const completeInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(completeInterval);
            setTimeout(() => {
              setShow(false);
              if (onComplete) onComplete();
            }, 500); // Small delay after 100%
            return 100;
          }
          return prev + 2;
        });
      }, 20);
    }
  }, [visible, show, progress, onComplete]);

  if (!show) return null;

  return (
    <div className="loader3-overlay">
      <div className="loader3-box">
        <img
          src={require("../../../assets/images/rajdhani.png")}
          alt="Logo"
          className="loader3-logo"
        />
        <div className="loader3-bar-wrapper">
          <div
            className="loader3-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="loader3-bar-segments">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="loader3-segment" />
            ))}
          </div>
        </div>
        <div className="loader3-percent">{progress}%</div>
      </div>
    </div>
  );
};

export default Loader2;
