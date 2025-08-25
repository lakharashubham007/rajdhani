import React, { useEffect, useState } from "react";
import "./TransferLoader.css";

const TransferLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // reset to loop progress
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transfer-loader">
      <div className="folder source-folder">
        <div className="folder-icon">📂</div>
        <span>Source</span>
      </div>

      <div className="transfer-area">
        {/* Multiple files moving in loop */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="file"
            style={{ animationDelay: `${index * 0.8}s` }}
          >
            📄
          </div>
        ))}

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="progress-text">{progress}%</span>
      </div>

      <div className="folder dest-folder">
        <div className="folder-icon">📂</div>
        <span>Destination</span>
      </div>
    </div>
  );
};

export default TransferLoader;
