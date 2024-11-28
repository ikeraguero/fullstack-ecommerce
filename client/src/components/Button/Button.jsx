import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired, // children is required and must be a renderable node
  onClick: PropTypes.func.isRequired, // onClick is a required function
};

export default Button;
