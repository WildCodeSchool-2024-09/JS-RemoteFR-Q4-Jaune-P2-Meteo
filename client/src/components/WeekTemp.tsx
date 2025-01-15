import { Line, LineChart } from "recharts";
import "../styles/WeekTemp.css";
export default function WeekTemp() {
  const data = [
    { name: "Lundi", temp: 33, humidity: 80 },
    { name: "Mardi", temp: 30, humidity: 70 },
    { name: "Mercredi", temp: 29, humidity: 89 },
    { name: "Jeudi", temp: 28, humidity: 65 },
    { name: "Vendredi", temp: 27, humidity: 40 },
    { name: "Samedi", temp: 26, humidity: 60 },
    { name: "Dimanche", temp: 25, humidity: 45 },
  ];
  return (
    <div className="week-temp">
      <h2>température de la semaine</h2>
      <LineChart width={350} height={250} data={data}>
        <Line type="monotone" dataKey="temp" stroke="white" />
        <Line type="monotone" dataKey="humidity" stroke="white" />
      </LineChart>
    </div>
  );
}
