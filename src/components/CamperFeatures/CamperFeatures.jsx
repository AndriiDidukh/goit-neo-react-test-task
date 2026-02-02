import styles from "./CamperFeatures.module.css";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campersSlice";
import { useParams } from "react-router-dom";
import Feature from "../Features/Feature/Feature";
import Features from "../Features/Features";

const CamperFeatures = () => {
  const visibleCampers = useSelector(selectCampers);
  const params = useParams();
  const camper = visibleCampers.find((camper) => camper.id === params.id);
  return (
    <div className={styles.container}>
      <Features camperId={camper.id} />
      <div className={styles.details}>
        <h3 className={styles.title}>Vehicle details</h3>
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            Form<span className={styles.featureValue}>{camper.form}</span>
          </div>
          <div className={styles.featureItem}>
            Length<span className={styles.featureValue}>{camper.length}</span>
          </div>
          <div className={styles.featureItem}>
            Width<span className={styles.featureValue}>{camper.width}</span>
          </div>
          <div className={styles.featureItem}>
            Height<span className={styles.featureValue}>{camper.height}</span>
          </div>
          <div className={styles.featureItem}>
            Tank<span className={styles.featureValue}>{camper.tank}</span>
          </div>
          <div className={styles.featureItem}>
            Consumtion
            <span className={styles.featureValue}>{camper.consumption}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperFeatures;
