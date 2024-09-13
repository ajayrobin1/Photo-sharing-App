import { Link } from 'react-router-dom';

export default function NavigatHome(){

    return(
        <div className='pt-2 mt-2 text-center'>
          <h3 className='h6'>
              Navigate
          </h3>
<div className='d-flex justify-content-center'>
  
            <Link
            class="btn btn-primary mx-1"
            to={'/gallery'}
            >
            Latest
          </Link>

          <Link
     
            class="btn btn-primary mx-1"
            to={'/gallery'}
            >
            Hot
          </Link>

          <Link
            class="btn btn-primary mx-1"
            to={'/explore'}
            >
            Explore
          </Link>
    </div>
</div>
    )
}