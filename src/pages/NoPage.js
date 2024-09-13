import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NoPage = () => {
    return (
    <>
    <Helmet>
    <title>artgallery.fun - Page not found</title>
      <meta name='errorpage' content='true' />
      <meta name='errortype' content='404 - Not Found' />
      <meta name='prerender-status-code' content='404' /> /
    </Helmet>
    <div className=' text-center p-2 pt-4'>
      <div className='p-4 text-center border mb-2 border-danger'>
        <h1 className='h5'>
            Error:404
        </h1>
        Page not found...!
      </div>
        <Link
        className="btn btn-primary mt-2"
        to = {'/'}
        >
            Go to home
        </Link>
    </div>
    </>)
  };
  
  export default NoPage;