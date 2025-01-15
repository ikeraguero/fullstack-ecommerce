import ErrorBoundary from "../ErrorBoundary/ErrorBoudary";
import styles from "./ErrorState.module.css";

function ErrorState({ error, retry }) {
  return (
    <div className={styles.errorContainer}>
      {error ? (
        <>
          <h2>Something went wrong...</h2>
          <p>{error.message}, try again later!</p>
        </>
      ) : (
        <ErrorBoundary error={error} retry={retry}></ErrorBoundary>
      )}
    </div>
  );
}

export default ErrorState;
