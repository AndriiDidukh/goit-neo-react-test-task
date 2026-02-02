import { useSelector } from "react-redux";
import Feature from "./Feature/Feature";
import { selectFilteredCampers } from "../../redux/campersSlice";

const Features = ({ camperId }) => {
  const visibleCampers = useSelector(selectFilteredCampers);
  const camper = visibleCampers.find((camper) => camper.id === camperId);

  if (!camper) return null;

  const {
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const features = [
    { id: "transmission", name: transmission, icon: "⚙️" },
    { id: "engine", name: engine, icon: "🛠️" },
    { id: "AC", name: "AC", icon: "🌬️", value: AC },
    { id: "bathroom", name: "Bathroom", icon: "🚿", value: bathroom },
    { id: "kitchen", name: "Kitchen", icon: "☕", value: kitchen },
    { id: "TV", name: "TV", icon: "📺", value: TV },
    { id: "radio", name: "Radio", icon: "📻", value: radio },
    {
      id: "refrigerator",
      name: "Refrigerator",
      icon: "🧊",
      value: refrigerator,
    },
    { id: "microwave", name: "Microwave", icon: "🍽️", value: microwave },
    { id: "gas", name: "Gas", icon: "🔥", value: gas },
    { id: "water", name: "Water", icon: "💧", value: water },
  ].filter((feature) => feature.value !== false && feature.value !== undefined);

  console.log("camper", camper);

  return (
    <div className="features">
      {features.map((feature) => (
        <Feature key={feature.id} name={feature.name} icon={feature.icon} />
      ))}
    </div>
  );
};

export default Features;
