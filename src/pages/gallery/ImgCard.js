import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageView from '../../modal/ImageView';
import { SnackBarContext } from '../../SnackContext';

const ImgCard = (props) => {
  const {key, id, title, imgUrl, loading} = props;
  const [state, setState] = useState({open:false, url:''});
  const [scrollPos, setScrollPos] = useState(0);
  const {addAlert} = useContext(SnackBarContext)

  const handleOpen = ()=>{
    addAlert("Pinch to zoom in")
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    setState({open:true, url:imgUrl})
    setScrollPos(window.scrollY)
    
  }
  
  return (
    <>
          <div className="col col-12 col-md-8 text-center p-0 mb-2">
          <Link className="p-0 m-0 text-center bg-dark" onClick={handleOpen}>
          {imgUrl &&
            <img
            id={id}
            key={key}
            // src={`https://res.cloudinary.com/dfoaqeavf/image/upload/w_${480}/v1707496275/${props.imgUrl}.webp`}
            
            // srcset={`https://res.cloudinary.com/dfoaqeavf/image/upload/w_${480}/v1707496275/${props.imgUrl}.webp 480w,
            // https://res.cloudinary.com/dfoaqeavf/image/upload/w_${800}/v1707496275/${props.imgUrl}.webp 800w
            // `}
            src={props.imgUrl}
            sizes="(max-width: 600px) 480px, 800px"
            alt={title}
            title={title}
            loading={loading}
            width={400}
            height={600}
            className='w-100 mx-auto object-center'
            />
          }
        </Link>
        </div>
        <ImageView state={state} scrollPos={scrollPos} setState={setState} />
      </>
  );

};

export default ImgCard;
