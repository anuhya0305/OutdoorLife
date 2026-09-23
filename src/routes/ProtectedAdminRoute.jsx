import { Navigate } from "react-router-dom";

// UI gate only; the API rejects admin requests without a valid token.
const ProtectedAdminRoute = ({ children }) => {
  if (!localStorage.getItem("adminToken")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
