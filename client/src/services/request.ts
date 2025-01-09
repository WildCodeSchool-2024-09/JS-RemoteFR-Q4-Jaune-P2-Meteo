import axios from "axios";
import type { WeatherDataTypes, dataTypes } from "../App";

const apiKey = import.meta.env.VITE_API_KEY;

const handleFetchData = async (
  city: string,
  setData: React.Dispatch<React.SetStateAction<dataTypes[]>>,
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataTypes>>,
) => {
  try {
    const cityResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
    );

    const cityData = cityResponse.data;
    setData(cityData);

    if (cityData.length > 0) {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=metric&lang=fr&appid=${apiKey}`,
      );

      setWeatherData(weatherResponse.data);
    } else {
      console.error("No city data found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { handleFetchData };
