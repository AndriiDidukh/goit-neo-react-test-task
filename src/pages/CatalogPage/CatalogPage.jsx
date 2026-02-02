import styles from "./CatalogPage.module.css";
import CamperDerails from "../../components/CamperDetails/CamperDetails";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../redux/filtersSlice";
import { selectFilteredCampers } from "../../redux/campersSlice";
import { useEffect } from "react";
import { toggleFeature } from "../../redux/filtersSlice";
import BodyTypeFilter from "../../components/BodyTypeFilter/BodyTypeFilter";

const CatalogPage = () => {
  const ITEMS_PER_PAGE = 4;

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const dispatch = useDispatch();
  const visibleCampers = useSelector(selectFilteredCampers);
  const visibleItems = visibleCampers.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [visibleCampers.length]);

  const FILTER_FEATURES = [
    { id: "AC", label: "AC", icon: "🌬️" },
    { id: "Automatic", label: "Automatic", icon: "⚙️" },
    { id: "Kitchen", label: "Kitchen", icon: "☕" },
    { id: "TV", label: "TV", icon: "📺" },
    { id: "Bathroom", label: "Bathroom", icon: "🚿" },
  ];

  const BODY_TYPES = [
    { id: "van", label: "Van", icon: "🚐" },
    { id: "fullyIntegrated", label: "Fully Integrated", icon: "🚌" },
    { id: "alcove", label: "Alcove", icon: "🚍" },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <label className={styles.locationLabel}>
          Location
          <br />
          <input
            className={styles.locationInput}
            type="text"
            onChange={(e) => dispatch(setLocation(e.target.value))}
            placeholder="Country, city "
          />
        </label>
        <p className={styles.filterTitle}>Filters</p>
        <h3 className={styles.filterSubtitle}>Vehicle equipment</h3>
        <div className={styles.grid}>
          {FILTER_FEATURES.map(({ id, label, icon }) => (
            <label key={id} className={styles.card}>
              <input
                type="checkbox"
                onChange={() => dispatch(toggleFeature(id))}
              />

              <div className={styles.content}>
                <span className={styles.icon}>{icon}</span>
                <span className={styles.text}>{label}</span>
              </div>
            </label>
          ))}
        </div>
        <h3 className={styles.filterSubtitle}>Vehicle type</h3>
        <BodyTypeFilter />
      </div>
      <div className={styles.products}>
        {visibleItems.map((camper) => (
          <CamperDerails key={camper.id} camper={camper} />
        ))}
        {visibleCount < visibleCampers.length && (
          <div className={styles.loadMoreWrapper}>
            <button className={styles.button} onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
