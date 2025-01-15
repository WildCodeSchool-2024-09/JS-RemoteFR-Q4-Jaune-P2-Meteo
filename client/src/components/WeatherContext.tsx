import axios from "axios";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface cityDataTypes {
  lon: number;
  lat: number;
}

interface propsTypes {
  city: string;
  setCity: (city: string) => void;
  handleFetchData: () => void;
  weatherData: {
    name: string;
    main: {
      feels_like: number;
      humidity: number;
      temp: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
    }[];
  };
}

interface WeatherproviderType {
  children: ReactNode;
}

const apiKey = import.meta.env.VITE_API_KEY;
const Weathercontext = createContext<propsTypes | null>(null);

export function Weatherprovider({ children }: WeatherproviderType) {
  const [city, setCity] = useState("" as string);
  const [cityData, setCityData] = useState([] as cityDataTypes[]);
  const [weatherData, setWeatherData] = useState({
    name: "",
    main: {
      feels_like: 0,
      humidity: 0,
      temp: 0,
    },
    wind: {
      speed: 0,
    },
    weather: [
      {
        description: "",
      },
    ],
  });
  console.info(cityData, weatherData);

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
  };

  useEffect(() => {
    if (cityData.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=metric&lang=fr&appid=${apiKey}`,
        )
        .then((response) => setWeatherData(response.data))
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données météo :",
            error,
          );
        });
    }
  }, [cityData]);

  return (
    <Weathercontext.Provider
      value={{ city, setCity, weatherData, handleFetchData }}
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
