import React from "react";
import "./Loader.css";

const Loader = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="loaderr-containerr">
      <div className="loaderr-contentt">
        <img
          src={require("../../../assets/images/bhokhe.png")
          }
          alt="Logo"
          className="loaderr-logoo"
        />
      </div>
    </div>
  );
};

export default Loader;