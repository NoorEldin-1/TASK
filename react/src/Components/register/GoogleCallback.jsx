import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");
    if (token && name) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("name", name);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/");
    }
  }, [navigate, location]);

  return null;
};
export default GoogleCallback;
