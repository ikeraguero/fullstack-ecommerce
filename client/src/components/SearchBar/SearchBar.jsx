import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div>
      <input type="text" className={styles.searchBar}></input>
    </div>
  );
}

export default SearchBar;
