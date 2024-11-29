import Nav from "../components/Nav/Nav";
import Main from "../components/Main/Main";
import styles from "../App.module.css";

function Home() {
  return (
    <>
      <Nav />
      <Main className={styles.container} />
    </>
  );
}

export default Home;
