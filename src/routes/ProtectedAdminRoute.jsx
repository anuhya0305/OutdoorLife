import { Navigate } from "react-router-dom";
import { tokenValid } from "../utils/session";

// UI gate only; the API rejects admin requests without a valid token.
const ProtectedAdminRoute = ({ children }) => {
  if (!tokenValid(localStorage.getItem("adminToken"))) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
