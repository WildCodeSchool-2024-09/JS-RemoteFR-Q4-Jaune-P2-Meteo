import { Outlet } from "react-router-dom";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/NavBar";
import "./App.css";

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
