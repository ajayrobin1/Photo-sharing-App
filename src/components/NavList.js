import { Link } from "react-router-dom";

export default function NavList(props){

  const innerWidth = window.innerWidth;

  if(innerWidth < 576)
    return(<></>)
  else
    return(<>
        <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <Link className="nav-link"
            key="home"
            to="/"
            activeClassName="highlighted"
          >
            Home
          </Link>
      </li>
      <li className="nav-item">
        
      <Link className="nav-link"
            key="gallery"
            to="/gallery"
            onClick={() => 
              sessionStorage.setItem('scroll-pos', NaN)
            }
          >
            Gallery
          </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link"
            key="explore"
            to="/explore"
          >
            Explore
          </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link"
            key="contact"
            to="/contact"
          >
            Contact
          </Link>
      </li>
    </ul>
        </>)
}