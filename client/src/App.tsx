import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/signup" />
        <Route path="/post/:postId" />
      </Routes>
    </>
  );
}

export default App;
