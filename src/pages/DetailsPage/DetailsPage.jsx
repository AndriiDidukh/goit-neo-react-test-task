import styles from "./DetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { selectCampers } from "../../redux/campersSlice";

const formLabels = {
  alcove: "Alcove",
  panelTruck: "Panel Truck",
  fullyIntegrated: "Integrated",
};

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Too short!").max(50).required("Required!"),
  email: Yup.string()
    .email("Invalid email address")
    .max(50)
    .required("Required!"),
});

const DetailsPage = () => {
  const campers = useSelector(selectCampers);
  const { id } = useParams();
  const camper = campers.find((item) => item.id === id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!camper) {
    return <p className={styles.notFound}>Camper not found.</p>;
  }

  const features = [
    camper.transmission === "automatic" && "Automatic",
    camper.AC && "AC",
    camper.engine && camper.engine[0].toUpperCase() + camper.engine.slice(1),
    camper.kitchen && "Kitchen",
    camper.radio && "Radio",
    formLabels[camper.form],
  ].filter(Boolean);

  const handleSubmit = (_, actions) => {
    actions.resetForm();
    alert("Your booking is submitted!");
  };

  return (
    <main className={styles.container}>
      <section className={styles.topSection}>
        <div className={styles.gallerySection}>
          <img
            className={styles.mainImage}
            src={camper.gallery[selectedImage].original}
            alt={camper.name}
          />

          <div className={styles.thumbnails}>
            {camper.gallery.map((image, index) => (
              <button
                type="button"
                key={image.original}
                className={`${styles.thumbnailButton} ${
                  selectedImage === index ? styles.selectedThumbnail : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.thumb || image.original}
                  alt={`${camper.name} ${index + 1}`}
                  className={styles.thumbnail}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <article className={styles.infoCard}>
            <h1 className={styles.name}>{camper.name}</h1>

            <div className={styles.meta}>
              <span>
                <span className={styles.star}>★</span> {camper.rating} (
                {camper.reviews.length} Reviews)
              </span>
              <span>
                <svg
                  width="12"
                  height="12"
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
                </svg>{" "}
                {camper.location}
              </span>
            </div>

            <p className={styles.price}>€{camper.price}</p>

            <p className={styles.description}>{camper.description}</p>
          </article>

          <article className={styles.vehicleCard}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>

            <div className={styles.featureList}>
              {features.map((feature) => (
                <span className={styles.feature} key={feature}>
                  {feature}
                </span>
              ))}
            </div>

            <dl className={styles.detailsList}>
              <div>
                <dt>Form</dt>
                <dd>{formLabels[camper.form]}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{camper.length}</dd>
              </div>
              <div>
                <dt>Width</dt>
                <dd>{camper.width}</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd>{camper.height}</dd>
              </div>
              <div>
                <dt>Tank</dt>
                <dd>{camper.tank}</dd>
              </div>
              <div>
                <dt>Consumption</dt>
                <dd>{camper.consumption}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>

          <div className={styles.reviewList}>
            {camper.reviews.map((review, index) => (
              <article className={styles.reviewCard} key={index}>
                <div className={styles.reviewHeader}>
                  <div className={styles.avatar}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className={styles.reviewerName}>
                      {review.reviewer_name}
                    </p>
                    <p className={styles.reviewStars}>
                      {"★".repeat(review.reviewer_rating)}
                      <span>{"★".repeat(5 - review.reviewer_rating)}</span>
                    </p>
                  </div>
                </div>

                <p className={styles.reviewComment}>{review.comment}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.booking}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>

          <Formik
            initialValues={{ name: "", email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.contactForm}>
              <div>
                <Field
                  className={styles.contactInput}
                  name="name"
                  type="text"
                  placeholder="Name*"
                />
                <ErrorMessage
                  className={styles.error}
                  component="span"
                  name="name"
                />
              </div>

              <div>
                <Field
                  className={styles.contactInput}
                  name="email"
                  type="email"
                  placeholder="Email*"
                />
                <ErrorMessage
                  className={styles.error}
                  component="span"
                  name="email"
                />
              </div>

              <button className={styles.button} type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </aside>
      </section>
    </main>
  );
};

export default DetailsPage;
