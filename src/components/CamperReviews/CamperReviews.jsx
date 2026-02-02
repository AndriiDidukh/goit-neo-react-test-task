import styles from "./CamperReviews.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCampers } from "../../redux/campersSlice";

const CamperReviews = () => {
  const visibleCampers = useSelector(selectCampers);
  const params = useParams();
  const camper = visibleCampers.find((camper) => camper.id === params.id);

  return (
    <div className={styles.container}>
      {camper.reviews.map((review) => (
        <div key={review.id}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.reviewerInfo}>
              <div className={styles.reviewerName}>{review.reviewer_name}</div>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= review.reviewer_rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CamperReviews;
