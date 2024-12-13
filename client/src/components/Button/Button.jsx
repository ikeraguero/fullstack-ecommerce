import styles from "./Button.module.css";

function Button({ children, handler }) {
  return (
    <button className={styles.button} onClick={handler}>
      {children}
    </button>
  );
}
export default Button;
