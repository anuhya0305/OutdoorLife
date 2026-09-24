import { Navigate } from "react-router-dom";
import { tokenValid } from "../../utils/session";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!tokenValid(user?.token)) {
    localStorage.removeItem("loggedInUser");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
