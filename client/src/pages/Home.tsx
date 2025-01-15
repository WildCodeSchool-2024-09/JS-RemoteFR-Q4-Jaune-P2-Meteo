import CardAlert from "../components/CardAlert";
import Cardhours from "../components/Cardhours";
import MainCard from "../components/MainCard";
import { useWeather } from "../components/WeatherContext";
import WeekTemp from "../components/WeekTemp";

export default function Home() {
  const { weatherData, weatherDays } = useWeather();

  if (!weatherData.name || !weatherDays) {
    return <div className="title-main-card">Cherchez une ville !</div>;
  }

  return (
    <>
      <MainCard />
      <div className="container-hours">
        {weatherDays.slice(0, 9).map((day) => (
          <Cardhours key={day.weather[0].id} day={day} />
        ))}
      </div>
      <CardAlert />
      <WeekTemp />
    </>
  );
}
