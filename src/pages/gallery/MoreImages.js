import { Link } from 'react-router-dom';
import {loadFirestore} from "../../database"
import {useState, lazy, Suspense, useEffect} from "react";
import { startAfter } from 'firebase/firestore';
const CustomImageList  = lazy(() => import("../../components/CustomImageList"))

export default function FullImage(props) {
    const { tags, docSnap} = props;
  const [files, setFiles] = useState([]);

  // useEffect(()=>{
  //     async function loadFiles(){
  //       const db = await loadFirestore()
  //       const {query, where, limit, collection, getDocs} = await import('firebase/firestore')
  //       const q = query(collection(db, "files"), startAfter(docSnap), where('tags', 'array-contains-any', tags), limit(6));
  //       await getDocs(q).then((querySnapshot)=>{
  //         const fileList = querySnapshot.docs.map((doc) => {
  //           return {
  //             id: doc.id,
  //             url: doc.data().url,
  //             imgUrl: doc.data().imgUrl,
  //           }
  //         });
  //         setFiles(fileList)
  //       })
  //   }
  //   if(tags?.length!==0) loadFiles()
  // },[tags, docSnap])
  
  return (
    <>
      <h3 className='h6 py-2' id="more-files">More Posts</h3>
      <Suspense fallback={<></>}>  
        <CustomImageList loading={"lazy"} files={files} hasMore={false}/>
      </Suspense>
      <Link
        to="/gallery"
        className="btn btn-primary my-2"
        id="home"
        aria-label="Home"
        title="Home"
        >
          Go to gallery
      </Link>
    </>
  );
}