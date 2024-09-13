import { Suspense, lazy } from 'react';

const TransformWrapper = lazy(()=> import('react-zoom-pan-pinch').then((module) => ({ default: module.TransformWrapper })))
const TransformComponent = lazy(()=> import('react-zoom-pan-pinch').then((module) => ({ default: module.TransformComponent })))

export default function ImageView(props) {

  const {state, setState, scrollPos} = props;

  const {open, url} = state;

  const handleClose= ()=>{
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    setState({open: false})
    window.scrollTo({
      top:scrollPos,
      behavior:'instant'
    })
  }

const downloadImage = async () => {
    const timeStamp = new Date().getTime()
    const { saveAs } = await import('file-saver')
    saveAs(`https://res.cloudinary.com/dfoaqeavf/image/upload/v1707496275/${url}.jpg`, timeStamp +"-artgallery-fun") // Put your image URL here.
  }
    
if(open)
  return (
    <>
<div className='text-center row m-0 img-modal-box text-light shadow p-0 bg-dark'>
  <div className='col col-12 col-md-6 p-0'>
<Suspense fallback={<></>}>
    <TransformWrapper>
      <TransformComponent >
          <img
          src={`https://res.cloudinary.com/dfoaqeavf/image/upload/v1707496275/${url}.jpg`} 
          alt={url}
          height={600}
          width={"auto"}
          className='col-12 mx-auto'
          />
      </TransformComponent>
    </TransformWrapper>
  </Suspense>
          </div>
          <div className='col col-md-3 col-12 p-0'>
      <button onClick={downloadImage} className='btn btn-outline-primary m-2'>Download</button>
      <button onClick={handleClose} className="btn btn-outline-primary m-2">Back</button>
          </div>
  </div>
  <button onClick={handleClose} className="backdrop backdrop-modal btn"></button>
        </>
  );
  else return(<></>)
}