import { useContext, useRef }  from 'react';
import { Helmet } from 'react-helmet';
import { SnackBarContext } from '../SnackContext';

const Feedback = () => {
  const emailRef = useRef()
  const messageRef = useRef()

  const {addAlert} = useContext(SnackBarContext)

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const message = `New feedback from user:%0Aemail: ${emailRef.current.value}%0A%0Amessage: "${messageRef.current.value}"`
      fetch(`https://api.telegram.org/bot7363791132:AAHFBnvu3GgwbN5wGlVs9LWPDXd2KAj37TY/sendMessage?chat_id=910493677&text=${message}`)
      console.log("Message sent");
      addAlert("Feedback submitted")

    } catch (e) {
      console.error("Error sending message: ", e);
      addAlert("Failed to sumbmit feedback")
    }

};
  return (
    <>
        <Helmet>
          <title>Contact us</title>
          <link rel="canonical" href={'https://sexyaigirs.fun/contact'} />
        </Helmet>  

        <section className='col-md-4 m-auto p-2'>
        <div className='w-50-sm text-center pt-2'>
      <h1 className='h5'> Contact </h1>
        <form onSubmit={handleSubmit} > 
      <div className='form-group'>
        <input className="form-control border-bottom border-light" required type="email" placeholder='Email'
        ref={emailRef}
        label="Email"
       />
        </div>

      <div className='form-item mt-2'>
        <textarea
         id="outlined-textarea"
         required
         className="form-control border-bottom border-light"
         rows={5}
         placeholder='Your message here...'
         ref= {messageRef}
         >
         </textarea>
      </div>

        <button 
        className='btn btn-primary mt-4 w-100'
          type="submit">Send
         </button>
      </form>
      </div>
      </section>
    </>
  );
};

export default Feedback;
