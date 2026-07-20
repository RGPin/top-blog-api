import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";

export const authLoader = async () => {};

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
