import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h2 className={styles.slogan}>
          You can find everything you want in our catalog
        </h2>
        <button className={styles.button} onClick={() => navigate("/catalog")}>
          View Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
