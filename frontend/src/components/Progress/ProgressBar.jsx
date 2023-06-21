import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ProgressBar = ({ duration, delay, action, color }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(100);
    }, delay);

    setTimeout(() => {
      action();
    }, duration * 1000);
  }, [progress]);

  const fillStyle = {
    width: `${progress}%`,
    height: "10px",
    backgroundColor: color || "gray",
    transition: `width ${duration}s ease-in-out`,
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={fillStyle} />
    </div>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  action: PropTypes.func,
};

ProgressBar.defaultProps = {
  color: null,
  action: () => {},
  delay: 100,
  duration: 2,
};
