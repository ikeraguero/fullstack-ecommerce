import ErrorBoundary from "../ErrorBoundary/ErrorBoudary";
import styles from "./ErrorState.module.css";

function ErrorState({ error, retry }) {
  return (
    <div className={styles.errorContainer}>
      <ErrorBoundary error={error} retry={retry} />
    </div>
  );
}

export default ErrorState;
