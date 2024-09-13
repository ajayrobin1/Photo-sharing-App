import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet';
import { loadFirestore } from "../../database";
import imgFiles from "../../files";

const CustomImageList  = lazy(() => import("../../components/CustomImageList"))

const Gallery = () => {
  const [files, setFiles] = useState(imgFiles.sort((a,b)=> b.views - a.views ).slice(0, 8))
  const [lastVisible, setLastVisible] = useState(null)

 async  function handleClick(){
    const db = await loadFirestore()
    const {limit, orderBy, query, collection, startAfter, getDocs} = await import('firebase/firestore')
    const q = query(collection(db, "files"), orderBy('trend', 'desc'), startAfter(lastVisible), limit(15))
    await getDocs(q).then((querySnapshot)=>{
      const fileList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          url: doc.data().url,
          imgUrl: doc.data().imgUrl,
          title: doc.data().title
        }
    });
    sessionStorage.setItem(`trend-index`, (files.length + querySnapshot.docs.length))
    setFiles(files =>[...files, ...fileList])
    setLastVisible(querySnapshot.docs.at(-1))
  })
  }


//   useEffect(() => {
//     async function getFiles(){
//       setFiles([])
//       const index =  Number(sessionStorage.getItem(`trend-index`)) || 15;
//         const db = await loadFirestore()
//         const {limit, orderBy, query, collection, getDocs} = await import('firebase/firestore')
//         const q = query(collection(db, "files"), orderBy('trend', 'desc'), limit(index))
//         await getDocs(q).then((querySnapshot)=>{
//           const fileList = querySnapshot.docs.map((doc) => {
//             return {
//               id: doc.id,
//               url: doc.data().url,
//               imgUrl: doc.data().imgUrl
//             }
//         });
//         setFiles(fileList)
//         setLastVisible(querySnapshot.docs.at(-1))
//       })
//       }
//   getFiles();
// },[])

  return (
    <>
        <Helmet>
          <title>Gallery of high resolution photos</title>
          <link rel="canonical" href={'https://artgallery.fun/gallery'} />
        </Helmet>

        <header className='p-2 text-center'>
          <h1 className='h5'>
          Browse hot images of sexy Ai girls from our gallery.
          </h1>
        </header>
        {(files.length===0)?
        <div class="d-flex justify-content-center p-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <>
        <main className='container text-center col-md-6 p-0'>
          <Suspense fallback={<div className="img-placeholder"></div>}>
            <CustomImageList loading={"eager"} files={files} parent='gallery'/>
          </Suspense>
        <div className="p-2 text-center">
          <button className="btn btn-outline-primary mx-1 col-md-3"
          onClick={handleClick}
          >Load more
          </button>
        </div>
        </main>
        </>
        }
    </>
  );
};

export default Gallery;
