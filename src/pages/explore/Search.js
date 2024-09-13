import { useState, useEffect, lazy, Suspense } from "react"
import {loadFirestore} from "../../database"
import LoadingScreen from "../Loading";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const CustomImageList  = lazy(() => import("../../components/CustomImageList"))
const SearchBox  = lazy(() => import("./Searchbox"))

const SearchComp = () => { 
  const [loading, setLoading] = useState(false)
  const [browseTag, setBrowseTag] = useState()
  const { tag } = useParams()
  const [files, setFiles] = useState([])
  const [lastVisible, setLastVisible] = useState(null)

  async  function handleClick(){
    if(lastVisible){
      const db = await loadFirestore()
      const {limit, orderBy, query, where, collection, startAfter} = await import('firebase/firestore')
      const q =  query(collection(db, "files"), where('tags', 'array-contains',browseTag ) ,orderBy('trend', 'desc'), startAfter(lastVisible), limit(15))
      const { getDocs } = await import("firebase/firestore");
      await getDocs(q).then((querySnapshot)=>{
        const fileList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            url: doc.data().url,
            imgUrl: doc.data().imgUrl
          }
        });
        sessionStorage.setItem(`${browseTag.name}-index`, (files.length + querySnapshot.docs.length))
        setFiles(files =>[...files, ...fileList])
        setLastVisible(querySnapshot.docs.at(-1))
      })
    }
  }
  

// useEffect(  () => { 
//   async function getTag(){
//     setLoading(true)
//     const db = await loadFirestore()
// const { getDoc,doc } = await import ("firebase/firestore"); 
//     const docRef = doc(db, "lists","tag-list")
//     await getDoc(docRef)
//     .then((Snapshot) =>{
//       const sortedList = Snapshot.data().tags
//       const foundTag = sortedList.find( e => {return e.name === tag.toLowerCase() })
//       if(foundTag === undefined) throw new Error("404: Not Found")
//       setBrowseTag(foundTag)    
//       setLoading(false)
//     })
//     .catch((err) => console.log(err))
// }
// getTag();
// },[tag]) 

useEffect(() => {

  async function getFiles(){
  const db = await loadFirestore()

const { where, getDocs, limit, query, collection, orderBy } = await import ("firebase/firestore"); 

  const q = query(collection(db, "files"), where('tags', 'array-contains',browseTag ) ,orderBy('trend', 'desc'), limit(15))

    await getDocs(q)
    .then((querySnapshot)=>{
      const fileList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          url: doc.data().url,
          imgUrl: doc.data().imgUrl
        }
    });
    setFiles(fileList)
    if(querySnapshot.docs.length <= 15) setLastVisible(querySnapshot.docs.at(-1))
      })

  
  }
  if(browseTag) getFiles();
},[browseTag])


  return (
    <>
    <Helmet>
    <title>{`Browse ${browseTag? browseTag.name:'hot images'} from art gallery`}</title>
    <link rel="canonical" href={`https://artgallery.fun/explore/${browseTag}`} />
    <meta property="og:title" content={`artgallery - ${browseTag? browseTag.name:'Explore'}`} />
    </Helmet>
    {loading?
      <LoadingScreen/>
    :<>
    <div className="col-md-6 m-auto p-2">
      <SearchBox />
   
    <header className="text-center pt-2">
      <h1  className="h5" style={{paddingBottom:'8px'}}>
        {browseTag?.name}
      </h1>
    </header>
    <main className="container col-md-10 m-auto p-0 text-center">
        {files &&
      <Suspense fallback={<LoadingScreen/>}>
      <CustomImageList 
      loading={"lazy"}
      parent={'explore'}  
      files={files}/>
      </Suspense>
    }
    </main>
  </div>
  {lastVisible &&
    <div className="p-2 text-center">
          <button className="btn btn-outline-primary mx-1 col-4"
          onClick={handleClick}
          >Load more
          </button>
    </div>
  }
    </>
}
  </>
  )
};

export default SearchComp;