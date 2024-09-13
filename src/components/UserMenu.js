import {AuthContext } from '../AuthContext';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../AuthContext';

import {ReactComponent as LightIcon} from '../icons/light_mode.svg'
import {ReactComponent as CollectionsIcon} from '../icons/collections.svg'
import {ReactComponent as MessageIcon} from '../icons/message.svg'
import {ReactComponent as LoginIcon} from '../icons/login.svg'
import {ReactComponent as LogoutIcon} from '../icons/logout.svg'
import {ReactComponent as PersonIcon} from '../icons/account_circle_24dp.svg'
import { SnackBarContext } from '../SnackContext';

export default function UserMenu(props) {

  const { currentUser } = useContext(AuthContext)
  const { addAlert } = useContext(SnackBarContext)

  const nameRef= useRef()

  function handleSubmit(e) {
    async function updateInfo(){
      await updateProfile(auth.currentUser, {
        displayName: nameRef.current.value
      }).then(() => {
        props.handleClose()
        addAlert('Profile info has been updated')
      }).catch((error) => {
        addAlert('Failed to update profile info')
      });
    }

    if(e.target.value) updateInfo()

  }
  if(props.open)
  return (
    <>
    <div className='custom-modal'>
    <ul
      className="shadow p-2 nav col-8  col-md-4 flex-column bg-dark text-light custom-modal-dialog"
      id="user-menu"
      >
    {currentUser &&
    <>
    <li className="nav-link d-flex align-items-center">
          { currentUser.photoURL?
          <img
          className='avatar'
          src={currentUser.photoURL}
          aria-label="recipe" />
          :
          <PersonIcon/>
}
          { currentUser.displayName?
          <> &nbsp; &nbsp;{currentUser.displayName}</>
          :
          <input
          type='text' 
          onBlur={handleSubmit}
          ref={nameRef} 
          className='p-1 mx-3 form-control'
          placeholder="Enter username" />
        }

    </li>
<hr/>
        </>
      }
<button className="nav-link text-start">
<LightIcon />
&nbsp; &nbsp;Light
</button>
<hr/>

  <Link
    className="nav-link"
    onClick={props.handleClose}
    to={props.view?'/profile/':'/profile/collection'}
  >
<CollectionsIcon />
    &nbsp; &nbsp;Collection
  </Link>
  <hr/>

  <Link
  className="nav-link"
    onClick={props.handleClose}
    to="/contact"
    >
<MessageIcon/>
    &nbsp; &nbsp;Contact   
  </Link>
  <hr/>

    {currentUser?
           <button
           onClick={()=>{
             props.handleOpenModal();
             props.handleClose();
           }
          }
           className="text-danger text-start nav-link"
           >
<LogoutIcon />
             &nbsp; &nbsp; Log out       
       </button>
       :
       <Link
       className="nav-link"
       to="/login"
onClick={props.handleClose}
>
<LoginIcon />
&nbsp; &nbsp;Log in       
   </Link>
    }
</ul>
    <button className='backdrop btn' onClick={props.handleClose}></button>
    </div>
</>
  )
  else (<></>)
}