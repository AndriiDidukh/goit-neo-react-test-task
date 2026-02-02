import clsx from "clsx";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const getActiveClassNames = ({ isActive }) =>
    clsx(isActive && styles.active, styles.link);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>TravelTrucks</div>
        <div className={styles.links}>
          <NavLink className={getActiveClassNames} to="/">
            Home
          </NavLink>
          <NavLink className={getActiveClassNames} to="/catalog">
            Catalog
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
