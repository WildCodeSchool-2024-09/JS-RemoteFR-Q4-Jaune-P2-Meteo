import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useWeather } from "./WeatherContext";
import "../styles/WeatherMap.css";
const apiKey = import.meta.env.VITE_API_KEY;

const MoveMap = ({ position }: MoveMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (position && position[0] !== 0 && position[1] !== 0) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
};

export default function WeatherMaps() {
  const { cityData } = useWeather();
  const [currentPosition, setCurrentPosition] = useState([
    51.505, -0.09,
  ] as MapPosition); // Default to London coordinates

  useEffect(() => {
    if (
      cityData &&
      Array.isArray(cityData) &&
      cityData.length > 0 &&
      cityData[0].lat &&
      cityData[0].lon
    ) {
      setCurrentPosition([cityData[0].lat, cityData[0].lon]);
    }
  }, [cityData]);

  const layers = [
    { layer: "clouds", name: "Nuage" },
    { layer: "precipitation", name: "Précipitation" },
    { layer: "pressure", name: "Pression" },
    { layer: "wind", name: "Vent" },
    { layer: "temp", name: "Température" },
  ];
  const [changeMap, setChangeMap] = useState(layers[0].layer);

  // Création d'un menu burger avec un state
  const [burger, setBurger] = useState(false);
  const handleShowNav = () => {
    setBurger(!burger);
  };
  return (
    <>
      <div className={`navbar ${burger ? "show-nav" : "hide-nav"}`}>
        <div className="logo">Changer de carte :</div>
        <div className="layer-container">
          {layers.map((layer) => (
            <button
              className="layer-button"
              key={layer.layer}
              type="button"
              onClick={() => setChangeMap(layer.layer)}
            >
              {layer.name}
            </button>
          ))}{" "}
        </div>
        <button type="button" className="navbar-burger" onClick={handleShowNav}>
          <span className="burger-bar" />
        </button>
      </div>
      <MapContainer
        center={currentPosition}
        zoom={5}
        style={{ height: "79vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          url={`https://tile.openweathermap.org/map/${changeMap}/{z}/{x}/{y}.png?appid=${apiKey}`}
        />
        <MoveMap position={currentPosition} />
        <Marker position={currentPosition}>
          <Popup>
            Current Location <br />
            Lat: {currentPosition[0]}, Lon: {currentPosition[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
