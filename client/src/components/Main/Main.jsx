import styles from "./Main.module.css";

function Main({ children }) {
  return (
    <main>
      <div className={styles.mainContainer}>{children}</div>
    </main>
  );
}

export default Main;
