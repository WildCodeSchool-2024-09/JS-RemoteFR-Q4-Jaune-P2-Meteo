import DailyForecast from "../components/DailyForecast";
import InputSearch from "../components/InputSearch";
import MainDetails from "../components/MainDetails";
import Navbar from "../components/NavBar";
import { useWeather } from "../components/WeatherContext";

export default function Details() {
  const { weatherData, weatherDays } = useWeather();

  if (!weatherData.name || !weatherDays) {
    return <div className="title-main-card">Cherchez une ville !</div>;
  }

  return (
    <>
      <InputSearch />
      <h1 className="title-main-card">{weatherData.name}</h1>
      <MainDetails />
      <DailyForecast />
      <Navbar />
    </>
  );
}
