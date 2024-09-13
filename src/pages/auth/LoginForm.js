import { useContext, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SnackBarContext } from "../../SnackContext"
import { auth } from "../../AuthContext";

export default function LoginForm(){
  const location = useLocation();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {addAlert} = useContext(SnackBarContext)

    const emailRef = useRef()
    const passwordRef = useRef()

    async function login(email, password) {
        const {signInWithEmailAndPassword} = await import('firebase/auth');
          return signInWithEmailAndPassword(auth, email, password)
        }

    async function handleSubmit(e) {
        e.preventDefault()
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          .then(()=>{
            const from = location.state?.from || "/";
            navigate(from, { replace: true })
          addAlert("Successully logged in")
          })
          .catch((e)=>{
        setLoading(false)
        addAlert("Failed to log in")
          })
        setLoading(false)
      }

    return(<>
    <form className="form" onSubmit={handleSubmit}>
            <input
            className="form-control mb-2 border-bottom border-light"
              required 
              fullWidth
              placeholder="Email" 
              ref={emailRef} 
              type="email"
              />

<input 
className="form-control mb-2 border-bottom border-light"
              required 
              placeholder="Password" 
              ref={passwordRef} 
              type={'password'}
              />
  
            <button
            class="btn btn-primary mt-4 w-100"
            disabled={loading} 
            type="submit">
              Log in
            </button>
          </form>
    </>)
}