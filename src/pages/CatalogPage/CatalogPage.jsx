import styles from "./CatalogPage.module.css";
import CamperDetails from "../../components/CamperDetails/CamperDetails";
import noCampersImage from "../../assets/no-campers.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setBodyType,
  setEngine,
  setLocation,
  setTransmission,
} from "../../redux/filtersSlice";
import { selectFilteredCampers } from "../../redux/campersSlice";

const ITEMS_PER_PAGE = 4;

const CAMPER_FORMS = [
  { value: "alcove", label: "Alcove" },
  { value: "panelTruck", label: "Panel Van" },
  { value: "fullyIntegrated", label: "Integrated" },
  { value: "semiIntegrated", label: "Semi-Integrated" },
];

const ENGINES = ["diesel", "petrol", "hybrid", "electric"];
const TRANSMISSIONS = ["automatic", "manual"];

const initialDraftFilters = {
  location: "",
  bodyType: null,
  engine: null,
  transmission: null,
};

const CatalogPage = () => {
  const dispatch = useDispatch();
  const visibleCampers = useSelector(selectFilteredCampers);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [draftFilters, setDraftFilters] = useState(initialDraftFilters);

  const visibleItems = visibleCampers.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [visibleCampers.length]);

  const updateDraftFilter = (name, value) => {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    dispatch(setLocation(draftFilters.location));
    dispatch(setBodyType(draftFilters.bodyType));
    dispatch(setEngine(draftFilters.engine));
    dispatch(setTransmission(draftFilters.transmission));

    setVisibleCount(ITEMS_PER_PAGE);
  };

  const clearFilters = () => {
    setDraftFilters(initialDraftFilters);
    dispatch(resetFilters());
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((count) => count + ITEMS_PER_PAGE);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.filters}>
        <label className={styles.locationLabel}>
          Location
          <div className={styles.locationField}>
            <span aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.7712 0.141029C19.8428 0.199699 19.9005 0.273527 19.94 0.357185C19.9796 0.440842 20.0001 0.53224 20 0.624779V18.1248C19.9999 18.2692 19.9498 18.4092 19.8582 18.5208C19.7666 18.6325 19.6391 18.709 19.4975 18.7373L13.2475 19.9873C13.1666 20.0034 13.0834 20.0034 13.0025 19.9873L6.875 18.7623L0.7475 19.9873C0.656861 20.0054 0.563332 20.0032 0.473651 19.9808C0.38397 19.9584 0.30037 19.9164 0.228874 19.8578C0.157378 19.7993 0.0997667 19.7255 0.0601897 19.642C0.0206127 19.5585 5.58159e-05 19.4672 0 19.3748L0 1.87478C8.72276e-05 1.73035 0.0501951 1.5904 0.141804 1.47874C0.233413 1.36708 0.360869 1.29059 0.5025 1.26228L6.7525 0.0122789C6.83337 -0.00388454 6.91663 -0.00388454 6.9975 0.0122789L13.125 1.23728L19.2525 0.0122789C19.3431 -0.00595135 19.4366 -0.00385945 19.5263 0.0184039C19.616 0.0406672 19.6997 0.0825478 19.7712 0.141029ZM12.5 2.38728L7.5 1.38728V17.6123L12.5 18.6123V2.38728ZM13.75 18.6123L18.75 17.6123V1.38728L13.75 2.38728V18.6123ZM6.25 17.6123V1.38728L1.25 2.38728V18.6123L6.25 17.6123Z"
                  fill="#101828"
                />
              </svg>
            </span>

            <input
              type="text"
              value={draftFilters.location}
              onChange={(event) =>
                updateDraftFilter("location", event.target.value)
              }
              placeholder="Kyiv"
            />
          </div>
        </label>

        <h2 className={styles.filterTitle}>Filters</h2>

        <fieldset className={styles.filterGroup}>
          <legend>Camper form</legend>

          {CAMPER_FORMS.map(({ value, label }) => (
            <label className={styles.radioLabel} key={value}>
              <input
                type="radio"
                name="bodyType"
                value={value}
                checked={draftFilters.bodyType === value}
                onChange={() => updateDraftFilter("bodyType", value)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend>Engine</legend>

          {ENGINES.map((item) => (
            <label className={styles.radioLabel} key={item}>
              <input
                type="radio"
                name="engine"
                value={item}
                checked={draftFilters.engine === item}
                onChange={() => updateDraftFilter("engine", item)}
              />
              {item[0].toUpperCase() + item.slice(1)}
            </label>
          ))}
        </fieldset>

        <fieldset className={styles.filterGroup}>
          <legend>Transmission</legend>

          {TRANSMISSIONS.map((item) => (
            <label className={styles.radioLabel} key={item}>
              <input
                type="radio"
                name="transmission"
                value={item}
                checked={draftFilters.transmission === item}
                onChange={() => updateDraftFilter("transmission", item)}
              />
              {item[0].toUpperCase() + item.slice(1)}
            </label>
          ))}
        </fieldset>

        <div className={styles.filterActions}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            type="button"
            className={styles.clearButton}
            onClick={clearFilters}
          >
            ×&nbsp; Clear filters
          </button>
        </div>
      </aside>

      <section className={styles.products}>
        {visibleCampers.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src={noCampersImage}
              alt="Camper search illustration"
              className={styles.emptyImage}
            />

            <h2 className={styles.emptyTitle}>No campers found</h2>

            <p className={styles.emptyText}>
              We couldn't find any campers that match your filters.
              <br />
              Try adjusting your search or clearing some filters.
            </p>

            <div className={styles.emptyActions}>
              <button
                type="button"
                className={styles.emptyClearButton}
                onClick={clearFilters}
              >
                ×&nbsp; Clear filters
              </button>

              <button
                type="button"
                className={styles.emptyViewButton}
                onClick={clearFilters}
              >
                View all campers
              </button>
            </div>
          </div>
        ) : (
          <>
            {visibleItems.map((camper) => (
              <CamperDetails key={camper.id} camper={camper} />
            ))}

            {visibleCount < visibleCampers.length && (
              <div className={styles.loadMoreWrapper}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CatalogPage;
