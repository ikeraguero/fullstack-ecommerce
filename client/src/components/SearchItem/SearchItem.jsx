import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";
function SearchItem({ name, image_type, image_data, id }) {
  return (
    <Link to={`/products/${id}`} className={styles.searchItemLink}>
      <div className={styles.searchResult}>
        <div className={styles.searchResultImg}>
          <img src={`data:${image_type};base64,${image_data}`} alt={name} />
        </div>
        <span>{name.toUpperCase()}</span>
      </div>
    </Link>
  );
}

export default SearchItem;
