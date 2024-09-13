import { Link } from 'react-router-dom';

export default function SocialLinks() {
  return (
    <div className="text-center pt-2">
      <h3 className='h6'>Social Links</h3>
      <div className='d-flex justify-content-center'>
        <div className='p-2 mx-2'>
        <Link target="_blank" to="https://www.instagram.com/#">
        <img width={30} role='presentation' height={30} src={process.env.PUBLIC_URL + "/static/instagram.svg"} alt="instagram logo" />
        </Link>
        </div>
        <div className='p-2 mx-2'>
        <Link target="_blank" to="https://t.me/#">
          <img width={30} role='presentation' height={30} src={process.env.PUBLIC_URL +"/static/telegram.svg"} alt="telegram logo" />
        </Link>
      </div>
        <div className='p-2 mx-2'>
        <Link target="_blank" to="https://www.reddit.com/r/#/">
        <img width={30} role='presentation' height={30} src={process.env.PUBLIC_URL +"/static/reddit.svg"} alt="reddit logo" />
        </Link>
      </div>
        <div className='p-2 mx-2'>
        <Link target="_blank" to="https://www.facebook.com/people/#">
        <img width={30} role='presentation' height={30} src={process.env.PUBLIC_URL +"/static/facebook.svg"} alt="facebook logo" />  
        </Link>
      </div>
      </div>
      </div>
  )
}