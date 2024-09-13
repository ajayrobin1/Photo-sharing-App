import { Link, useLocation } from 'react-router-dom';
import {ReactComponent as HomeIcon} from '../icons/home.svg'
import {ReactComponent as WhatshotIcon} from '../icons/whatshot.svg'
import {ReactComponent as ExploreIcon} from '../icons/explore.svg'
import {ReactComponent as CollectionsIcon} from '../icons/collections.svg'

function BottomNavBar(props) {
  const location = useLocation();
  const path = location.pathname;

  const listObject = [
    {
    path:'/',
    icon:HomeIcon,
    key:'home'
  },
  {
    path:'/gallery',
    icon:WhatshotIcon,
    key:'gallery'

  },    {
    path:'/explore',
    icon:ExploreIcon,
    key:'explore'

  },    {
    path:'/profile/collection',
    icon:CollectionsIcon,
    key:'collection'

  }, 
]

  return (
    <>
    <nav class="bg-dark text-light navbar fixed-bottom p-2 nav-underline nav-bottom align-items-center justify-content-evenly">

    { listObject.map((item)=> {
      return(
        <div key={item.key} class="nav-item">
        <Link  class={`nav-link text-light ${path===item.path?'active': 'inactive'}`} to={item.path}  disabled= {path===item.path?true: false}
          aria-label={item.key}
        >
        <item.icon className='pb-1'/>
        </Link>    
        </div>
      )
    }
  )
}
</nav>
            </>
  )}
export default BottomNavBar;