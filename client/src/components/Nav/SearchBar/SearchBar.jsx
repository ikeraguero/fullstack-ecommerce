import { useRef } from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div className={styles.searchBar} onClick={handleClick}>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Search for an item"
      ></input>
      <ion-icon name="search-outline"></ion-icon>
    </div>
  );
}

export default SearchBar;
