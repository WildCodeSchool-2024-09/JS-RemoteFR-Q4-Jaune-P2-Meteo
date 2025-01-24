import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const Weathercontext = createContext<propsTypes | null>(null);

export function Weatherprovider({ children }: WeatherproviderType) {
  const [city, setCity] = useState("" as string);
  const [cityData, setCityData] = useState([] as cityDataTypes[]);
  const [weatherData, setWeatherData] = useState({} as weatherDataTypes);
  const [weatherDays, setWeatherDays] = useState([] as WeatherDay[]);
  const [name, setName] = useState("" as string);

  console.info(cityData, weatherData, weatherDays);

  const handleFetchData = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
      )
      .then((response) => setCityData(response.data))
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données météo :",
          error,
        );
      });
    setCity("");
  };

  useEffect(() => {
    if (cityData.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=metric&lang=fr&appid=${apiKey}`,
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données météo :",
            error,
          );
        });
    }
  }, [cityData]);

  useEffect(() => {
    if (weatherData?.weather) {
      const weatherCondition = weatherData.weather[0].main;
      if (weatherCondition === "Clear") {
        document.body.style.backgroundImage =
          "url('/assets/images/BG-Main.jpg')";
      } else if (weatherCondition === "Rain") {
        document.body.style.backgroundImage = "url('/assets/images/rain.jpg')";
      } else if (weatherCondition === "Snow") {
        document.body.style.backgroundImage = "url('/assets/images/snow.jpg')";
      } else if (weatherCondition === "Clouds") {
        document.body.style.backgroundImage =
          "url('/assets/images/clouds.jpg')";
      } else if (weatherCondition === "Mist") {
        document.body.style.backgroundImage = "url('/assets/images/mist.jpg')";
      } else {
        document.body.style.backgroundImage =
          "url('/assets/images/BG-Main.jpg')";
      }
    }
  }, [weatherData]);

  //implantation du useEffect pour le jour par jour
  useEffect(() => {
    if (cityData.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=metric&lang=fr&appid=${apiKey}`,
        )
        .then((response) => setWeatherDays(response.data.list))
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données météo :",
            error,
          );
        });
    }
  }, [cityData]);

  // Get user location

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`,
            )
            .then((response) => setWeatherData(response.data))
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des données météo :",
                error,
              );
            });
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`,
            )
            .then((response) => setWeatherDays(response.data.list))
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des données météo :",
                error,
              );
            });
        });
      } else {
        console.error(
          "La géolocalisation n'est pas supportée par ce navigateur.",
        );
      }
    };

    getUserLocation();
  }, []);

  return (
    <Weathercontext.Provider
      value={{
        city,
        setCity,
        weatherData,
        setWeatherData,
        handleFetchData,
        weatherDays,
        setWeatherDays,
        cityData,
        setCityData,
        name,
        setName,
      }}
    >
      {children}
    </Weathercontext.Provider>
  );
}
export const useWeather = () => {
  const value = useContext(Weathercontext);
  if (value === null) {
    throw new Error("You need to wrap your component in <WeatherProvider>");
  }
  return value;
};
