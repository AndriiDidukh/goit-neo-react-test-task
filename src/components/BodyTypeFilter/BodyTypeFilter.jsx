import { useDispatch, useSelector } from "react-redux";
import { setBodyType } from "../../redux/filtersSlice";
import styles from "./BodyTypeFilter.module.css";

const BODY_TYPES = [
  { id: "panelTruck", label: "Van", icon: "🚐" },
  { id: "fullyIntegrated", label: "Fully Integrated", icon: "🚌" },
  { id: "alcove", label: "Alcove", icon: "🚍" },
];

const BodyTypeFilter = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.filters.bodyType);

  return (
    <div className={styles.grid}>
      {BODY_TYPES.map(({ id, label, icon }) => (
        <label key={id} className={styles.card}>
          <input
            type="radio"
            name="bodyType"
            checked={selected === id}
            onChange={() => dispatch(setBodyType(id))}
          />

          <div className={styles.content}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.text}>{label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default BodyTypeFilter;
