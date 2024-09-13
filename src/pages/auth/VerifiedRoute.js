import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../AuthContext"
import { useContext } from "react";

const VerifiedRoute = ({ children }) => {
  const location = useLocation()
  const { currentUser } = useContext(AuthContext);

  if(currentUser){
    if(currentUser.emailVerified){
        return children;
    } else {
        return <Navigate 
        to={`/email-not-verified`}
        state={{ from: location }} 
        replace
        /> 
    }
  } else {
    return <Navigate 
    to={`/login`}
    state={{ from: location }} 
    replace
    /> 
  }
  
  };

  export default VerifiedRoute;