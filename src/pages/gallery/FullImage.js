import { useParams, useSearchParams } from 'react-router-dom';
import {useState, useEffect, lazy, Suspense} from "react";
import { Helmet } from 'react-helmet';
import ReactionButtons from '../../components/ReactionButtons';
import files from '../../files';

const ImgCard  = lazy(() => import("./ImgCard"))
const TagBox  = lazy(() => import("../../components/TagBox"))
const TelegramBanner  = lazy(() => import("./TelegramBanner"))
const MoreImages  = lazy(() => import("./MoreImages"))
const Footer  = lazy(() => import("../../components/Footer"))

export default function FullImage(props) {
  const {url} = useParams(null);
  const [searchParams] = useSearchParams()
  const [file, setFile] = useState(null);
  const [docSnap, setDocSnap] = useState(null);
  const paramId = searchParams.get("id")
  
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })

  useEffect(() => {
  setFile(null)
async function getfiles(){
  // if(paramId){
    // const {getFileById} = await import("./getfile")
    const imgFile =  files.find((file) => file.id === paramId)
    setFile(imgFile)
//     setFile({
//       id: docSnap.id,
//       imgList: docSnap.data().imgList,
//       imgUrl: docSnap.data().imgUrl,
//       title: docSnap.data().title,
//       description: docSnap.data().description,
//       nsfw: docSnap.data().nsfw,
//       tags: docSnap.data().tags,
//       likedBy: docSnap.data().likedby
//     })
// setDocSnap(docSnap)

// } else {
//     const {getFileByUrl} = await import("./getfile")
//     const docSnap = await getFileByUrl(url)
//     setFile({
//       id: docSnap.id,
//       imgList: docSnap.data().imgList,
//       imgUrl: docSnap.data().imgUrl,
//       title: docSnap.data().title,
//       description: docSnap.data().description,
//       nsfw: docSnap.data().nsfw,
//       tags: docSnap.data().tags,
//       likedBy: docSnap.data().likedby
//     })
// setDocSnap(docSnap)
//   }
}
getfiles()

}, [url, paramId])


  return (
    <>
    <Helmet>
          <title>{file?.title}</title>
          <meta
            name="description"
            content={file?.description}
          />
          <link rel="canonical" href={`https://artgallery.fun/gallery/${url}`} />
    </Helmet>
      <div className='row m-0'>
      <section className='col col-12 col-md-6 p-0'>
    <header className='text-center p-2'>
      {file?
      <>
    <h1 className='h6 pt-1'>
              {file.title}
    </h1>
    <p className='my-1'>
              {file.description}
    </p>
      </>
      :<>
      <h1 aria-hidden="true" class="h6 pt-6 placeholder-glow"><span class="placeholder col-10"></span></h1>
      <p aria-hidden="true" className='my-1 placeholder-glow mx-0'>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      </p>
      <div aria-hidden="true" className='img-placeholder bg-dark'></div>
      </> 
      }
      </header> 
      <div className='row m-0 justify-content-center'>
        <ImgCard 
        key={0}
        loading="eager"
        imgUrl={file?.imgUrl}
        title={`${file?file.title:'Loading...'} ${1}`}  
        />
      {(file && file.imgList?.length !== 0) &&
      
      file.imgList?.map((item, i) => (
        <Suspense fallback={<></>}>
          <ImgCard
          fileName={item} 
          key={i+1}
          title={`${file.title} ${i+2}`} 
          imgUrl={item}
          loading="lazy"
          />
          </Suspense>
      ))
      }
    </div>
    <>
    <ReactionButtons />
    </>
</section>
<section className='col col-12 col-md-6 text-center p-0'>
<div className='p-2 text-center'>
    <h3 className='h6'>Related Tags:</h3>
    <hr/>
    <Suspense fallback={<></>}>
      <TagBox tags = {file?.tags}/>     
    </Suspense>
  </div>
<Suspense fallback={<></>}>
      <TelegramBanner />
</Suspense>

{ file &&
<MoreImages tags={file.tags} docSnap={docSnap} />
}

</section>
     </div> 

     <Suspense fallback={<></>}>  
    <Footer/> 
    </Suspense>
    </>
  );
}