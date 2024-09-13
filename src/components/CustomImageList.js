import { Link } from 'react-router-dom';
import Image from './Image';

// function srcset(image) {
//   return {
//     src: `https://res.cloudinary.com/dfoaqeavf/image/upload/w_240/v1716976849/${image}.webp`,
//     srcSet: `
//     https://res.cloudinary.com/dfoaqeavf/image/upload/w_240/v1716976849/${image}.webp 240w,
//     https://res.cloudinary.com/dfoaqeavf/image/upload/w_480/v1716976849/${image}.webp 480w,
//     https://res.cloudinary.com/dfoaqeavf/image/upload/w_640/v1716976849/${image}.webp 640w`,
//     sizes:"(max-width: 480px) 240px, 640px"
//   };
// }
const CustomImageList = (props) => {

  const {files, loading} = props;
  return (
      <div className='row m-0 p-1 img-list-container'>
        
       {files.map((item) => (
            <div 
            key={item.id}
            className='col col-4 col-md-3 px-0'
            >
        <Link to={`/gallery/${item.title}?id=${item.id}`}
            >
          <Image 
          imgUrl={item.imgUrl}
          alt={item.title}
          fetchpriority={'high'}
          loading={loading}
          width={120}
          height={200}
          />
        
        </Link>
        </div>
      ))}
  </div>
  );

};
export default CustomImageList;