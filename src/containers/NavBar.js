import { lazy, Suspense, useState } from "react";
import Navbar from '../components/Navbar.js';

const UserMenu = lazy(() => import('../components/UserMenu.js'))
const BottomNavBar = lazy(() => import('../components/BottomNavBar.js'))
const LogoutModal = lazy(() => import('../modal/LogoutModal.js'))

export default function NavBar({ children }){

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  function handleOpen(){
    setOpen(true)
    }

    function handleClose(){
      setOpen(false)
      }

    function handleOpenModal(){
      setOpenModal(true)
    document.getElementsByTagName('body')[0].classList.add('modal-open');
      }
      function handleCloseModal(){
        setOpenModal(false)
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
      }

    return(
      <>
        <Suspense fallback={<></>}>
        <LogoutModal open={openModal} handleCloseMenu={handleClose}  handleClose={handleCloseModal}/>
        </Suspense>
        <Suspense fallback={<></>}>
          <UserMenu open={open} handleClose={handleClose} handleOpenModal={handleOpenModal} />
        </Suspense>
        <Navbar handleOpen={handleOpen}/>
        <main className='container-fluid main-container px-0'>
          {children}
        </main>
        <Suspense fallback={<></>}>
        <BottomNavBar/>
        </Suspense>
  </>
    )
}