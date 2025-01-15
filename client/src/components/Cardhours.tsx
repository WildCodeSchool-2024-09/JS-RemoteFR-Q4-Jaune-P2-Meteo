import "../styles/Cardhours.css";

interface weatherDaysTypes {
  day: {
    dt_txt: string;
    weather: {
      icon: string;
    }[];
    main: {
      temp: number;
    };
  };
}
export default function Cardhours({ day }: weatherDaysTypes) {
  const dateString = day.dt_txt;
  const time = dateString.split(" ")[1].substring(0, 5);
  return (
    <>
      <div className="card-hour">
        <p>{Math.round(day.main.temp)}°</p>
        <img
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt={`${day.weather[0].icon}`}
        />
        <p>{time}</p>
      </div>
    </>
  );
}
