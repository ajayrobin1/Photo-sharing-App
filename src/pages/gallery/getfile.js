import {loadFirestore} from "../../database"

const getFileById = async (paramId)=>{
    const db = await loadFirestore()
  const {getDoc, doc, updateDoc, increment } = await import('firebase/firestore')
  const file = await getDoc(doc(db, "files", paramId)).then((docSnap)=>{
    async function updateViews(){
      await updateDoc(doc(db, "files", paramId),{
        views: increment(1)
      })
      sessionStorage.setItem(`doc-${paramId}`, new Date().getTime()) 
    }
    const timeStamp = sessionStorage.getItem(`doc-${paramId}`)
    if(!timeStamp) updateViews();
   return(docSnap)
  });
  return(file)
}

const getFileByUrl = async (url)=>{
    const db = await loadFirestore()
const {query, where, collection, getDocs, doc, updateDoc, increment} = await import('firebase/firestore')
    const q = query(collection(db, "files"), where('url', '==', url));
    const file = await getDocs(q).then((querySnapshot)=>{
      const docSnap = querySnapshot.docs.at(0);
      return(docSnap)
  })

  async function updateViews(){
    await updateDoc(doc(db, "files", file.id),{
      views: increment(1)
    })
  sessionStorage.setItem(`doc-${file.id}`, new Date().getTime()) 
  }
  const timeStamp = sessionStorage.getItem(`doc-${file.id}`)
  if(!timeStamp) updateViews();

  return(file)
}

export {getFileById, getFileByUrl}