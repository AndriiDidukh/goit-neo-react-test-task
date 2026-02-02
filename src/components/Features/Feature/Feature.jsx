import styles from "./Feature.module.css";

const Feature = ({ name, icon }) => {
  return (
    <div className={styles.feature}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{name}</span>
    </div>
  );
};

export default Feature;
