import { Outlet } from "react-router-dom";
import "./App.css";
import InputSearch from "./components/InputSearch";

function App() {
  return (
    <>
      <InputSearch />
      <Outlet />
      <h1>NavBar</h1>
    </>
  );
}

export default App;
