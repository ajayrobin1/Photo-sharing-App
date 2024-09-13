import { Link } from 'react-router-dom';

export default function TagBox(props) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {props.tags?
        <>
            {props.tags.map((tag, i) => {
              return(
                <Link
                className='btn btn-outline-light p-2 m-2 text-lowercase rounded-4'
                key={i}
                to={`../explore/${tag.name}`}
                >
                  {`#${tag.name} `}
                </Link>
              )
            })}
      </>:<>
        <button tabIndex="-1" className='btn btn-light p-2 m-1 disabled col-2 placeholder rounded-4'></button>
        <button tabIndex="-1" className='btn btn-light p-2 m-1 disabled col-2 placeholder rounded-4'></button>
        <button tabIndex="-1" className='btn btn-light p-2 m-1 disabled col-2 placeholder rounded-4'></button>
        <button tabIndex="-1" className='btn btn-light p-2 m-1 disabled col-2 placeholder rounded-4'></button>
        <button tabIndex="-1" className='btn btn-light p-2 m-1 disabled col-2 placeholder rounded-4'></button>
      </>
          }
    </div>
  )
}