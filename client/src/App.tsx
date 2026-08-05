import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import PostDetails from "./pages/PostDetails/PostDetails";

function App() {
  return (
    <div className="App">
      <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:postId" element={<PostDetails />} />
        </Routes>
      </main>
    </div>
    </div>
  );
}

export default App;

