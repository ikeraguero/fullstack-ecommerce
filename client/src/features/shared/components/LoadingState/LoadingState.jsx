import { Spinner } from "@nextui-org/react";
import styles from "./LoadingState.module.css";

function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner size="lg" />
    </div>
  );
}

export default LoadingState;
