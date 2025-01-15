import styles from "./LoadingState.module.css";
import { MoonLoader } from "react-spinners";

function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <MoonLoader />
    </div>
  );
}

export default LoadingState;
