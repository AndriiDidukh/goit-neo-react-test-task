import { useNavigate } from "react-router-dom";
import styles from "./CamperDetails.module.css";
import Features from "../Features/Features";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite, toggleFavorite } from "../../redux/favoritesSlice";

const CamperDetails = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(camper.id));

  const { name, rating, location, price, description } = camper;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery[0].original}
          alt={name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.priceBlock}>
            <span className={styles.price}>€{price}.00</span>
            <button
              onClick={() => dispatch(toggleFavorite(camper.id))}
              aria-label="Toggle favorite"
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            ⭐ {rating} ({camper.reviews.length} Reviews)
          </span>
          <span className={styles.location}> {location}</span>
        </div>

        <p className={styles.description}>{description.slice(0, 72) + "..."}</p>
        <Features camperId={camper.id} />
        <button
          className={styles.button}
          onClick={() => navigate(`/catalog/${camper.id}`)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperDetails;
