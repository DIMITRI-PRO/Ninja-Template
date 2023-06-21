import PropTypes from "prop-types";
import { Button } from "../Buttons/Button";
import { ProgressBar } from "../Progress/ProgressBar";
import { X } from "../../assets/FeatherIcons";

export const NotificationMessage = ({
  display,
  setDisplay,
  content,
  setErrors,
}) => {
  const divStyle = {
    position: "fixed",
    minHeight: 150,
    minWidth: 300,
    backgroundColor: "#fff",
    bottom: 10,
    left: 10,
    borderRadius: "0.5rem",
    boxShadow: "10px 10px 15px -5px rgba(0,0,0,0.3)",
  };

  return (
    content &&
    display && (
      <div style={divStyle} className="ninja notif-message">
        <div className="ninja notif-close">
          <Button
            name="close-notif"
            icon={X}
            onClick={() => setDisplay(false)}
          />
        </div>
        {content && <div className="ninja notif-content">{content}</div>}
        <ProgressBar
          duration={5}
          action={() => {
            setDisplay(!display);
            setErrors([]);
          }}
        />
      </div>
    )
  );
};

NotificationMessage.propTypes = {
  display: PropTypes.bool,
  setDisplay: PropTypes.func,
  setErrors: PropTypes.func,
  content: PropTypes.string,
};

NotificationMessage.defaultProps = {
  display: false,
  setDisplay: () => {},
  setErrors: () => {},
  content: "",
};
