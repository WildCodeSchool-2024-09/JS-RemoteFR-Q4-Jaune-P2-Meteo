import "../styles/MainDetails.css";
import { useWeather } from "../components/WeatherContext";

export default function MainDetails() {
  const { weatherData } = useWeather();

  return (
    <>
      <div className="background">
        <p>Météo actuelle :</p>
        <div className="MainDetails">
          <div className="météo">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={`${weatherData.weather[0].icon}`}
            />
            <p>
              <span className="degré">
                {Math.round(weatherData.main.temp)}°C
              </span>
            </p>
          </div>
          <div className="météo2">
            <p className="description">{weatherData.weather[0].description}</p>
            <p className="ressenti">
              ressenti {Math.round(weatherData.main.feels_like)}°C{" "}
            </p>
          </div>
        </div>
        <div className="minmax">
          <p>min {Math.round(weatherData.main.temp_min)}°C</p>
          <p>max {Math.round(weatherData.main.temp_max)}°C</p>
        </div>
        <div className="trait" />
        <div className="description">
          <p>
            Le taux d'<span> humidité</span> est de{" "}
            <span>{weatherData.main.humidity}%</span>
          </p>
          <p>
            La vitesse du <span> vent</span> est de{" "}
            <span>{Math.round(weatherData.wind.speed)} </span>
            km/h
          </p>
          <p>
            <span>levé</span> du soleil à{" "}
            <span>
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </span>
          </p>
          <p>
            <span>Couché</span> du soleil à{" "}
            <span>
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
