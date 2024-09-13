import { Link } from 'react-router-dom';
// import TelegramIcon from '@mui/icons-material/Telegram';

export default function TelegramBox() {
  return (
<div className='text-left'>
      <p className='lead mt-2'>
        Subscribe telegram chanel for regular updates.
       </p>
       <Link
       className='btn btn-primary float-right mb-2 mx-2'
                  target="_blank" rel="noopener noreferrer"
                  to={'https://t.me/#'}
       >
<img width={24} height={24} src={process.env.PUBLIC_URL +"/static/telegram.svg"} alt="icon" />
&nbsp;&nbsp;Join Telegram
      </Link>
  </div>
  )
}