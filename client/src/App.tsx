import { Outlet } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import InputSearch from "./components/InputSearch";
import WeatherContext from "./services/WeatherContext";
import { handleFetchData } from "./services/request";

export interface dataTypes {
  lon: number;
  lat: number;
}

export interface WeatherDataTypes {
  name: string;
}

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([] as dataTypes[]);
  const [weatherData, setWeatherData] = useState({} as WeatherDataTypes);
  console.info(data, weatherData);

  return (
    <>
      <InputSearch
        city={city}
        setCity={setCity}
        setData={setData}
        setWeatherData={setWeatherData}
        handleFetchData={handleFetchData}
      />
      <WeatherContext.Provider value={{ weatherData }}>
        <Outlet />
        <h1>NavBar</h1>
      </WeatherContext.Provider>
    </>
  );
}

export default App;
