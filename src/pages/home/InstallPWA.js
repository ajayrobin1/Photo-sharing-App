import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {ReactComponent as InstallIcon} from '../../icons/install_mobile.svg'
import {ReactComponent as SendIcon} from '../../icons/send.svg'

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return (
      <Link
        to="https://t.me/aiartgaleria"
        target="_blank"
        class="btn btn-primary"
        id="telegram_button-home"
        aria-label="Join Telegram"
        title="Join Telegram"
        >
<SendIcon />
    <span className='icon-text'>&nbsp;&nbsp;Join Telegram</span>
  </Link>
    );
  }
  return (
    <button
      class="btn btn-primary"
      id="app_button"
      aria-label="Install app"
      title="Install app"
        onClick={onClick}
      >
<InstallIcon />
    <span>&nbsp;&nbsp;Install App</span>
    </button>
  );
};

export default InstallPWA;