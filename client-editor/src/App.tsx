import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
