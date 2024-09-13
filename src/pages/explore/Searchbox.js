import { useState, useEffect } from "react"
import { loadFirestore } from "../../database"
import { Link } from "react-router-dom";

const Explore = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [tagList, setTagList] = useState([]);
  const [keyword, setKeyword] = useState();
  const [loading, setLoading] = useState(false);
  
//   useEffect(  () => { 
//     async function getTags(){
//       setLoading(true)
//       const db = await loadFirestore()
// const { doc } = await import("firebase/firestore"); 
//       const docRef = doc(db, "lists","tag-list")
// const { getDoc } = await import("firebase/firestore"); 
//       const Snapshot = await getDoc(docRef)
//       const sortedList = Snapshot.data().tags.sort((a,b) => a.name.localeCompare(b.name))
//       const filterdList = sortedList.filter( e => {return e.name >= keyword.toLowerCase() })
//       setTagList(filterdList.splice(0,5))
//       setLoading(false)
//   }
//     if(keyword){
//       getTags();
//   }
// }, [keyword, props])

  return (
    <>
              <input 
              type="text"
              className="form-control mt-1 border-bottom border-light" 
              placeholder="Search tags.."
                onChange={(e)=>{
                  setKeyword(e.target.value.toLowerCase())
                }}
              />
<ul className="list-group mt-1">
  {loading?
  <li className="list-group-item" >
    <p className="m-0">Loading...</p>
  </li>
  :<>
{tagList &&  tagList.map( tag => (
  <li className="list-group-item">
  <Link
  key = {tag.id}
  to ={`/explore/${tag.name}`}
  selected={selectedIndex === tag.indexOf}
  onClick={() => {
    setSelectedIndex(0);
  }}
>
  <p className="mb-1">
{`#${tag.name}`}
</p>
</Link>
</li>
))
}
</>
}
</ul>
</>
  )
};

export default Explore;