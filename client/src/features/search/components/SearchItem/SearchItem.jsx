import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";
function SearchItem({ name, imageType, imageData, id, handleItemClick }) {
  return (
    <Link
      to={`/products/${id}`}
      className={styles.searchItemLink}
      onClick={handleItemClick}
    >
      <div className={styles.searchResult}>
        <div className={styles.searchResultImg}>
          <img src={`data:${imageType};base64,${imageData}`} alt={name} />
        </div>
        <span>{name.toUpperCase()}</span>
      </div>
    </Link>
  );
}

export default SearchItem;
