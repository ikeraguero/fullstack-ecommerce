import { useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useSearch } from "../../../api/search.api";
import { useNavigate } from "react-router-dom";

function SearchBar({ setSearchProducts }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const { mutateAsync: search } = useSearch();
  const navigate = useNavigate();

  function handleClick() {
    inputRef.current.focus();
  }

  async function handleSearch() {
    const res = await search(query);
    setSearchProducts(res);
    navigate("/search");
  }

  return (
    <div className={styles.searchBar} onClick={handleClick} id="searchBar">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
        placeholder="Search for an item"
        id="input"
      ></input>
      <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
    </div>
  );
}

export default SearchBar;
