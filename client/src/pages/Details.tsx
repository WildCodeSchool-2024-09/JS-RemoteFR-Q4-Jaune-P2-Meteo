import MainDetails from "../components/MainDetails";
import { useWeather } from "../components/WeatherContext";

export default function Details() {
  const { weatherData, weatherDays } = useWeather();

  if (!weatherData.name || !weatherDays) {
    return <div className="title-main-card">Cherchez une ville !</div>;
  }

  return (
    <>
      {/* <h2>Details</h2> */}
      <h1 className="title-main-card">{weatherData.name}</h1>
      <div>
        <MainDetails />
      </div>
    </>
  );
}
