import { Navigate } from "react-router-dom"
import { AuthContext } from "../../AuthContext"
import { useContext } from "react";

  const AnonymousRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/" /> :
  children;
  };

  export default AnonymousRoute;