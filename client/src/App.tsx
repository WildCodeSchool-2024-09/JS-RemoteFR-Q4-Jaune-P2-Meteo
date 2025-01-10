import { Outlet } from "react-router-dom";
import "./App.css";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <InputSearch />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
