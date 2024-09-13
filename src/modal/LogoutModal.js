import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../SnackContext";
import { useContext } from "react";

export default function LogoutModal(props) {
  const {open, handleClose} = props
  const navigate = useNavigate()
  const {addAlert} = useContext(SnackBarContext);
  
  async function logout() {
    const { auth } = await import("../AuthContext");
    const {signOut} = await import('firebase/auth');
      return signOut(auth)
    }
    
  async function handleLogout() {
      await logout().then(()=>{
        addAlert("Logged out successfully")
        navigate('/login')
        handleClose()
      }).catch((err)=>{
        console.log(err)
        addAlert("Failed to logout")
        handleClose()
      })
  }
if(open)
  return (
    <>
  <div class="text-center">
  <div class="custom-modal-box col-9 col-md-4 bg-dark text-light shadow p-2" role="document">
      <div class="p-2">
        <h5 class="h6">Logout</h5>
      </div>
      <div class="mb px-2">
        <p>Are you sure, want to logout?</p>
      </div>
      <div class="d-flex justify-content-center pb-2">
        <button type="button" class="btn btn-danger mx-2" onClick={handleLogout}>Yes</button>
        <button type="button"
         class="btn btn-secondary mx-2" onClick={handleClose}>No </button>
      </div>
    </div>
  <button onClick={handleClose} className="backdrop backdrop-modal btn"></button>
</div>
        </>
  );
  else return(<></>)
}
