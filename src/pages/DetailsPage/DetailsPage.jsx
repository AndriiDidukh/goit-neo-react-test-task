import styles from "./DetailsPage.module.css";
import { Outlet, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campersSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const DetailsPage = () => {
  const visibleCampers = useSelector(selectCampers);
  const params = useParams();
  const camper = visibleCampers.find((camper) => camper.id === params.id);

  const getActiveClassNames = ({ isActive }) =>
    clsx(isActive && styles.active, styles.link);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Too short!").max(50).required("Required!"),
    email: Yup.string()
      .email("Invalid email address")
      .max(50)
      .required("Required!"),
    date: Yup.date().required("Required!"),
    message: Yup.string().max(500, "Too long!"),
  });

  const handleSubmit = (values, actions) => {
    actions.resetForm();
    alert("Your booking is submitted!");
  };

  return (
    <>
      {camper && (
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.name}>{camper.name}</div>
            <div className={styles.rating}>
              <span className={styles.rating}>
                ⭐ {camper.rating} ({camper.reviews.length} Reviews)
              </span>
              <span className={styles.location}> {camper.location}</span>
            </div>
            <div className={styles.price}>€{camper.price}.00</div>
          </div>
          <div className={styles.gallery}>
            {camper.gallery.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <img
                  src={image.original}
                  alt={`${camper.name} - ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
          <div className={styles.description}>{camper.description}</div>
          <div className={styles.links}>
            <NavLink className={getActiveClassNames} to="features">
              Features
            </NavLink>
            <NavLink className={getActiveClassNames} to="reviews">
              Reviews
            </NavLink>
          </div>
          <div className={styles.divider}>
            <div>
              <Outlet />
            </div>
            <div className={styles.booking}>
              <h3>Book your campervan now</h3>
              <p>Stay connected! We are always ready to help you.</p>
              <Formik
                initialValues={{ name: "", email: "", date: "", message: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form className={styles.contactForm}>
                  <Field
                    type="text"
                    name="name"
                    className={styles.contactInput}
                    placeholder="Name"
                  ></Field>
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={styles.error}
                  />
                  <Field
                    type="text"
                    name="email"
                    className={styles.contactInput}
                    placeholder="Email"
                  ></Field>
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={styles.error}
                  />
                  <Field
                    type="date"
                    name="date"
                    className={styles.contactInput}
                    placeholder="Date"
                  ></Field>
                  <ErrorMessage
                    name="date"
                    component="span"
                    className={styles.error}
                  />
                  <Field
                    as="textarea"
                    name="message"
                    className={styles.contactTextarea}
                    placeholder="Comment"
                  ></Field>
                  <ErrorMessage
                    name="message"
                    component="span"
                    className={styles.error}
                  />
                  <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.button}>
                      Send
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsPage;
