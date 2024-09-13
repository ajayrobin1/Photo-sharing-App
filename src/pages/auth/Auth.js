import { lazy, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
import AnonymousRoute  from "./AnonymousRoute";
import { SnackBarContext } from "../../SnackContext";
import { auth } from "../../AuthContext";

const LoginForm = lazy(()=>import('./LoginForm')) ;
const SignupForm = lazy(()=>import('./SignupForm')) ;
const ForgotPassword = lazy(()=>import('./ForgotPassword')) ;

export default function Login(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('login')
  const navigate = useNavigate()
  const {addAlert} = useContext(SnackBarContext)

  async function signInWithGoogle(){
  const from = location.state?.from || "/";
  const {  signInWithPopup } = await import("firebase/auth");
  
    setLoading(true)
    const { GoogleAuthProvider, browserPopupRedirectResolver } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider, browserPopupRedirectResolver).then(() =>{
      navigate(from, { replace: true })
      addAlert("Successully logged in")
    }
    ).catch(()=>{
    })
  setLoading(false)
  }

  return (
    <AnonymousRoute>
    <Helmet>
      <title>artgallery - Login</title>
      <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
    </Helmet>

    <div className="col-md-4 mx-auto">


<ul class="nav nav-tabs justify-content-center mt-2">
  <li class="nav-item">
    <button name="login" onClick={()=>setTab('login')} class={`nav-link ${tab==='login' && 'active'}`} aria-current="page">Login</button>
  </li>
  <li class="nav-item">
    <button name="signup" onClick={()=>setTab('signup')} class={`nav-link ${tab==='signup' && 'active'}`}>Signup</button>
  </li>
  <li class="nav-item">
    <button name="reset" onClick={()=>setTab('reset')} class={`nav-link ${tab==='reset' && 'active'}`}>Reset Password</button>
  </li>
</ul>

<div className="p-3">
{tab==="login"?

<LoginForm/>

:tab==="signup"?
<SignupForm/>
:
<ForgotPassword/>

}

          <p variant="subtitle1" align="center" gutterBottom>or</p>
          <p variant="subtitle1" align="center" gutterBottom>Sign in using Google</p>
          <button
            disabled={loading} 
            onClick={signInWithGoogle}
            class="btn btn-outline-primary w-100"
            type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
            </button>

</div>
   
              </div>
    </AnonymousRoute>
  )
}