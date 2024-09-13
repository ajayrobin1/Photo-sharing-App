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


const Image = (props) => {
  const {imgUrl, alt, fetchpriority, loading, width, height} = props;
  // const imgSrc = `https://res.cloudinary.com/dfoaqeavf/image/upload/w_320/v1716976849/${imgUrl}.webp`
  // const imgSrcSmall = `https://res.cloudinary.com/dfoaqeavf/image/upload/w_160/v1716976849/${imgUrl}.webp`
  return (
        <img 
        alt = {alt} 
        fetchpriority={fetchpriority}
        width={width}
        height={height}
        loading={loading}
        srcSet={`${imgUrl} 160w, ${imgUrl} 320w`}
        src={imgUrl}
        className={` w-100 p-1 mx-auto`}
        />
  );

};
export default Image;