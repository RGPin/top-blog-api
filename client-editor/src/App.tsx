import { Outlet, redirect } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import { refreshToken } from "./api/refreshToken";
import { useAuthStore } from "./store/useAuthStore";

export const authLoader = async () => {
  try {
    await refreshToken();
  } catch {
    useAuthStore.getState().clearToken();
    redirect("/login");
  }

  // check if accessToken not null for protected routes
  return null;
};

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
