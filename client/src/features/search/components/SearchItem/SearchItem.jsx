import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";
function SearchItem({
  name,
  imageType,
  imageData,
  id,
  handleItemClick,
  index,
  length,
}) {
  const isLast = index === length - 1;
  return (
    <li className={styles.item}>
      <Link
        to={`/products/${id}`}
        className={styles.searchItemLink}
        onClick={handleItemClick}
      >
        <div className={isLast ? styles.searchResultLast : styles.searchResult}>
          <div className={styles.searchResultImg}>
            <img src={`data:${imageType};base64,${imageData}`} alt={name} />
          </div>
          <span>{name.toUpperCase()}</span>
        </div>
      </Link>
    </li>
  );
}

export default SearchItem;
