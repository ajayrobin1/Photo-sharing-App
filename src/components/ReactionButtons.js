import { useState } from 'react';

export default function ReactionButtons(props) {
  const [alignment, setAlignment] = useState(null);
  const currentUser  = null;

  const handleChange = (event, newAlignment) => {
    if(currentUser){
      setAlignment(newAlignment);
      props.handleSnackbarOpen({
        message: 'Feedback submitted successfully',
        severity:'success'
      })
    } else {
      props.handleSnackbarOpen({
        message: 'Please login to submit feedback',
        severity:'error'
      })
    }
  };

  return (
    <div className='mx-auto w-100 d-flex justify-content-center'>
        <button class="btn btn-primary mx-1" value="like"  > Like</button>
        <button class="btn btn-primary mx-1" value="dislike"> Dislike</button>
        <button class="btn btn-primary mx-1" value="dislike"> comment</button>
  </div>
  )
}