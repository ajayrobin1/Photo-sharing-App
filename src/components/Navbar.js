import { Link } from 'react-router-dom';
import {ReactComponent as MoreIcon} from '../icons/more_vert.svg'
import { Suspense, lazy } from 'react';

const NavList  = lazy(() => import("./NavList"))

function ResponsiveAppBar(props) {

  return (
    <header>

<nav className="bg-dark text-light nav-top navbar navbar-expand-md shadow sticky-top py-0 p-2">
  <Link className="navbar-brand text-light logo" to="/">
            Art Gallery
  </Link>
  <div class="nav-list-top collapse navbar-collapse">
  <Suspense fallback={<></>}>
    <NavList />
  </Suspense>
  </div>
    <button id="dropdownMenu2" className="btn user-menu-toggle border-0"
    type="button"
    aria-label="more"
    onClick={props.handleOpen}
    >
      <MoreIcon />
    {/* <img width={24} src={process.env.PUBLIC_URL + "/icons/more_vert.svg"} alt="instagram logo" /> */}
  </button>
</nav>
    </header>
  );
}
export default ResponsiveAppBar;