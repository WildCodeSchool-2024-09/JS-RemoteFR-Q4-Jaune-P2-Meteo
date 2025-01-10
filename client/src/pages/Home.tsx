import Cardhours from "../components/Cardhours";
import "../components/MainCard";
import CardAlert from "../components/CardAlert";
import MainCard from "../components/MainCard";
import WeekTemp from "../components/WeekTemp";
export default function Home() {
  return (
    <>
      <MainCard />
      <Cardhours />
      <CardAlert />
      <WeekTemp />
    </>
  );
}
