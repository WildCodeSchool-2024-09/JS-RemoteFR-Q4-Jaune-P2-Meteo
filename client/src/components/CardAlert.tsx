import "../Styles/CardAlert.css";
import SvgIcons from "./SvgIcons";

const icons = [
  {
    warning: {
      width: "40px",
      height: "40px",
      path: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z",
    },
  },
];

export default function CardAlert() {
  return (
    <div className="card_alert">
      <SvgIcons
        path={icons[0].warning.path}
        height={icons[0].warning.height}
        width={icons[0].warning.width}
      />

      <p>This is an alert</p>
    </div>
  );
}
