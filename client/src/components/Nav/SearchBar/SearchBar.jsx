import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useSearch } from "../../../api/search.api";
import { useNavigate } from "react-router-dom";
import SearchItem from "../../SearchItem/SearchItem";

function SearchBar({ setSearchProducts }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const searchBarRef = useRef();
  const { mutateAsync: search } = useSearch();
  const navigate = useNavigate();
  const debounceTimeout = 500;

  useEffect(
    function () {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, debounceTimeout);

      return () => {
        clearTimeout(handler);
      };
    },
    [query]
  );

  useEffect(() => {
    if (debouncedQuery) {
      const fetchData = async () => {
        try {
          const res = await search(debouncedQuery);
          setResults(res);
        } catch (err) {
          console.log("Search error: ", err);
        }
      };
      fetchData();
    } else {
      setResults([]);
    }
  }, [debouncedQuery, search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClick() {
    inputRef.current.focus();
  }

  async function handleSearch() {
    const res = await search(query);
    setSearchProducts(res);
    navigate("/search");
    setQuery("");
    setDebouncedQuery("");
  }

  return (
    <div>
      <div
        className={styles.searchBar}
        onClick={handleClick}
        id="searchBar"
        ref={searchBarRef}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          placeholder="Search for essentials, groceries, and more..."
          id="input"
        ></input>
        <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
        <div className={styles.results}>
          {results?.map((result) => (
            <SearchItem key={result.id} {...result} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
