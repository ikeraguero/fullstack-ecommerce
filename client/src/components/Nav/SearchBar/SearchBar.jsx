import styles from "./SearchBar.module.css";

function SearchBar() {
  
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for an item"
      ></input>
      <ion-icon name="search-outline"></ion-icon>
    </div>
  );
}

export default SearchBar;
