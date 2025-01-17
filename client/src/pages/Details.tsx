import DailyForecast from "../components/DailyForecast";
import { useWeather } from "../components/WeatherContext";

export default function Details() {
  const { weatherData, weatherDays } = useWeather();

  if (!weatherData.name || !weatherDays) {
    return <div className="title-main-card">Cherchez une ville !</div>;
  }

  return (
    <>
      <DailyForecast />
    </>
  );
}
