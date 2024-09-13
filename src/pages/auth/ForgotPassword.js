import { useContext, useRef, useState } from "react"
import { SnackBarContext } from "../../SnackContext";

export default function ForgotPassword(props) {
  const emailRef = useRef()
  const [loading, setLoading] = useState(false)
  const {addAlert} = useContext(SnackBarContext)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const { resetPassword } = import("firebase/auth");
      await resetPassword(emailRef.current.value)
      addAlert("Check your inbox for further instructions")

    } catch {
      addAlert("Failed to reset password")
    }
    setLoading(false)
  }

  return (
    <>
          <form className="form" onSubmit={handleSubmit}>
            <input 
            className="form-control mb-2 border-bottom border-light"
            id="outlined-basic" 
              required 
              fullWidth
              placeholder="Email" 
              variant="outlined"
              inputRef={emailRef} 
              type="email"
              />
            <button
            disabled={loading} 
            className="btn btn-primary w-100 mt-4"
            type="submit">
              Send Request
            </button>
          </form>
    </>
  )
}
