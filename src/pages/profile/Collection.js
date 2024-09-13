import {loadFirestore} from "../../database";
import {useState, useEffect, useContext} from "react";
import LoadingScreen from '../Loading';
import { AuthContext } from '../../AuthContext';

export default function Collection() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext)

  useEffect( () => { 

async function getFiles(){

setLoading(true)
const db = await loadFirestore()
const  {doc,getDoc} = await import("firebase/firestore");
const Snapshot = await getDoc(doc(db, 'user-data', currentUser.uid ))
if(Snapshot.data()){
  console.log(Snapshot.data())
  setFiles(Snapshot.data().likes.reverse().map(item =>({
    id:item,
    imgUrl:item
  }
  )))
}
setLoading(false)
}

getFiles()

},[currentUser])

  return (
      <>
    {
    loading
    ?
    <LoadingScreen/>
  :<div className="text-center">
  { files.length === 0 || files === undefined?
    <p className="p-2 m-2"> There are no pictures in your collection yet. </p>
    :
    <ul className="grid-list"
    >
      {files.map((item) => (
        <li>
        {item.imgUrl}
        </li>
    ))}
  </ul>
  }

  </div>
      }
    </>
  );
}