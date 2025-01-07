import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>INPUT</h1>
      <Outlet />
      <h1>NavBar</h1>
    </>
  );
}

export default App;
