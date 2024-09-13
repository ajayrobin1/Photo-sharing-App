import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import files from '../../files';
import { loadFirestore } from '../../database';

const popularTags = [{"name":"photography"},
  {"name":"nature"},{"name":"portrait"},
  {"name":"fashion"},{"name":"wallpaper"},
  {"name":"surreal"},
  {"name":"travel"},
  {"name":"landcape"},
  {"name":"cityscape"}
]

const CustomImageList = lazy(()=>import("../../components/CustomImageList"));
const InstallPWA = lazy(()=>import("./InstallPWA"));
const NavigateHome = lazy(()=>import("../../components/NavigateHome"));
const TagBox = lazy(()=>import("../../components/TagBox"));
const Footer = lazy(()=>import("../../components/Footer"));

const Home = (props) => {
  const scrollPos = sessionStorage.getItem("home-scroll-pos" ) || 0;
  setTimeout(()=>{
    window.scrollTo({
      top:scrollPos,
      behavior:'instant'
    })
  }, 300);

  // const [files, setFiles] = useState([
  //   {id:'1',
  //   url:"1",
  //   title:"",
  //   imgurl:""
  // }, 
  // ])

//   useEffect(() => {
//     async function getFiles(){
//       const db = await loadFirestore()
//       const {collection, limit, query, orderBy, getDocs} = await import("firebase/firestore")
//         const q = query(collection(db, "files"), orderBy('uploadedOn', 'desc'), limit(12))
//           await getDocs(q)
//           .then((querySnapshot)=>{
//           const fileList = querySnapshot.docs.map((doc) => {
//             return {
//               id: doc.id,
//               url: doc.data().url,
//               title: doc.data().title,
//               imgUrl: doc.data().imgUrl
//             }
//         });
//        setFiles(fileList)
//        const stringArray = JSON.stringify(fileList)
//        sessionStorage.setItem('home-files', stringArray)
//         })
//     }
//     const homeFiles = JSON.parse(sessionStorage.getItem("home-files") || "[]")
//     if(homeFiles.length !== 0){
//       setFiles(homeFiles)
//     } else {
//       getFiles();
//     } 
// },[])

return( 
      <>
        <Helmet>
          <title>Art gallery</title>
          <meta
            name="description"
            content="Collection of photos"
          />
          <link rel="canonical" href={'https://artgallery.fun'} />
        </Helmet>
      <>
      <div className='row p-0 m-0 justify-content-center'>
        <div className='col col-12 col-md-6 text-center p-0'>
      <header className='p-3'>
              <h1 className='h6'>
              Welcome to my Portfolio...!
              </h1>
              <small>
              This is an instagram like photo sharing app developed by Ajay Robin.
              </small>
      </header>
        <Suspense fallback={<button tabIndex="-1" class="btn btn-outline-primary disabled placeholder col-6 col-md-2"></button>}>
            <InstallPWA />
        </Suspense>
          <h2 className='h6 mt-4'>
              Latest Images
          </h2>

          <Suspense fallback={<div className='row m-0 p-1 img-list-container'></div>}>
                  <CustomImageList  loading={"eager"} files={files.sort((a,b)=> a.id - b.id)} />
          </Suspense>   
      </div>
      {/* {files.length !== 0 &&<> */}
        <div className='text-center col col-12 col-md-3 mt-2 p-3'>
      <h2 className='h6'>
              Explore
          </h2>
          <Suspense fallback={<></>}>
          <TagBox tags={popularTags}/>
        </Suspense>

      </div>
      <div className='col-12 col-md-8 p-2'>
      <Suspense fallback={<></>}>
                  <NavigateHome /> 
      </Suspense>
      <div className='my-2'>
              <small>
- Optimized for Performance              <br/>
- User friendly features               <br/>
- Supports Authorization and Authentication
              </small>
      </div>
            <div class="alert border border-warning p-2 text-start my-3" role="alert">
            <p className='alert-heading'>
              Info:
          </p>
          <small className='p-0 m-0'>
              I do not own the copyrights of images used in this site.
          </small>
    </div>
      <Suspense fallback={<></>}>
        <Footer />
      </Suspense>
      </div>
        {/* </>} */}
    </div>
      </>

      </>
  )
};
export default Home;