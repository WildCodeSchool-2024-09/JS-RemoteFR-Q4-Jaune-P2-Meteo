import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/NavBar";

import axios from "axios";

interface cityDataTypes {
  lon: number;
  lat: number;
}

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("" as string);
  const [cityData, setCityData] = useState([] as cityDataTypes[]);
  const [weatherData, setWeatherData] = useState([] as []);
  console.info(cityData, weatherData);

  const handleFetchData = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
      )
      .then((response) => setCityData(response.data));
  };

  useEffect(() => {
    if (cityData.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=metric&lang=fr&appid=${apiKey}`,
        )
        .then((response) => setWeatherData(response.data));
    }
  }, [cityData]);

  return (
    <>
      <InputSearch
        city={city}
        setCity={setCity}
        handleFetchData={handleFetchData}
      />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
