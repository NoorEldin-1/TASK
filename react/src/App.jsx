import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./Components/dashboard/Dashboard";
import Landing from "./Components/landing/Landing";
import GoogleCallback from "./Components/register/GoogleCallback";

const App = () => {
  if (window.localStorage.getItem("token")) {
    return (
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
    );
  }
};

export default App;
