import { useContext, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SnackBarContext } from "../../SnackContext";
import { auth } from "../../AuthContext";

export default function SignupForm() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {addAlert} = useContext(SnackBarContext)

  const location = useLocation();
  
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function signup(email, password) {
    const {createUserWithEmailAndPassword, sendEmailVerification} = await import('firebase/auth');
      return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        sendEmailVerification(cred.user);
        auth.signOut()
    })
    }
    async function login(email, password) {
      const {signInWithEmailAndPassword} = await import('firebase/auth');
      return signInWithEmailAndPassword(auth, email, password)
    }
    
  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return addAlert("Passwords do not match")
    }
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        async function loginUser(){
          await login(emailRef.current.value, passwordRef.current.value)
          .then(()=>{
      addAlert("Please check your inbox to verify email")
            const from = location.state?.from || "/";
            navigate(from, { replace: true })
          })
          .catch(()=>{
      addAlert("Account created and failed to Login")
          }

          )
        }
      loginUser()  
      }).catch((error) => {
        console.log(error)
      addAlert("Failed to create account")
      });
    setLoading(false)
}

  return (
          <form className="form" onSubmit={handleSubmit}>
            <input
            className="form-control mb-2 border-bottom border-light"
              required 
              placeholder="Email" 
              ref={emailRef} 
              type='email'
              />

              <input 
              required 
    className="form-control mb-2 border-bottom border-light"
              placeholder="Password" 
              ref={passwordRef} 
              type='password'
              />

              <input 
              className="form-control mb-2 border-bottom border-light"
              size="small"
                required 
                placeholder="Confirm password" 
                ref={passwordConfirmRef} 
                type='password'
                />

            <button
            variant="outlined"
            class="btn btn-primary mt-4 w-100"
            disabled={loading} 
            type="submit">
              Sign Up
            </button>
        </form>

  )
}
