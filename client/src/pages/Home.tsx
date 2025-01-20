import CardAlert from "../components/CardAlert";
import Cardhours from "../components/Cardhours";
import InputSearch from "../components/InputSearch";
import MainCard from "../components/MainCard";
import Navbar from "../components/NavBar";
import { useWeather } from "../components/WeatherContext";
import WeekTemp from "../components/WeekTemp";

export default function Home() {
  const { weatherData, weatherDays } = useWeather();

  if (!weatherData.name || !weatherDays) {
    return (
      <>
        <InputSearch />
        <div className="title-main-card">Cherchez une ville !</div>
      </>
    );
  }

  return (
    <>
      <InputSearch />
      <MainCard />
      <div className="container-hours">
        {weatherDays.slice(0, 9).map((day) => (
          <Cardhours key={day.dt_txt} day={day} />
        ))}
      </div>
      <CardAlert />
      <WeekTemp />
      <Navbar />
    </>
  );
}
