import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../AuthContext';
import PrivateRoute  from "./PrivateRoute";
import { SnackBarContext } from '../../SnackContext';

const NotVerified = (props) => {
  const [loading, setLoading] = useState(false)
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const {addAlert} = useContext(SnackBarContext)
  
  useEffect(() =>{
    function check(){
      if(currentUser.emailVerified){
        navigate('/', {replace: true})
        return () => {}
      }
    }
    check()
  }, [currentUser,navigate])


  async function handleClick(){
    setLoading(true)
    const { sendEmailVerification } =  await import("firebase/auth");
    
    await sendEmailVerification(currentUser).then(() => {
      addAlert("Verifcation email has been sent")
      sessionStorage.setItem('verifcation_email_sent', 'true')
    }

    ).catch( () => {
      addAlert("Failed to send verifcation email")
    })
    setLoading(false)
  }
    return (
    <PrivateRoute>
    <Helmet>
    <title>artgallery.fun | Email not verified</title>
      <meta name='errorpage' content='true' />
      <meta name='errortype' content='Not verified' />
    </Helmet>
    <div className='col-md-4 m-auto p-2'>
    <div className='border border-warning p-2'>
        <h2 className='h6'>
            Email address not verified. 
        </h2>
        Please check your inbox to to verify your email address. 
    </div>
    <div>
    <p className='p-1 pt-2'>Not Recived mail?</p>
    <button
    className='btn btn-primary w-100'
    onClick={() => handleClick()}
    disabled = {(loading === true || sessionStorage.getItem('verifcation_email_sent')==='true')?true:false}
    >
      Get Link
    </button>

    <Link className='btn btn-outline-danger w-100 mt-4'
    to = {-1}
    >
      Back
    </Link>
      </div>
  </div>
    </PrivateRoute>)
  };  
export default NotVerified;