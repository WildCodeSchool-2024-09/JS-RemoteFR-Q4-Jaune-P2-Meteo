import CardAlert from "../components/CardAlert";
import Cardhours from "../components/Cardhours";
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
