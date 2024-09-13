import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../AuthContext"
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const {currentUser} = useContext(AuthContext)

  return currentUser ? children : <Navigate 
  to={`/login`}
  state={{ from: location }} 
  replace
  />;

  };

  export default PrivateRoute;