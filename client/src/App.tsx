import { Outlet } from "react-router-dom";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/NavBar";
import { Weatherprovider } from "./components/WeatherContext";
import "./App.css";
function App() {
  return (
    <Weatherprovider>
      <InputSearch />
      <Outlet />
      <Navbar />
    </Weatherprovider>
  );
}

export default App;
