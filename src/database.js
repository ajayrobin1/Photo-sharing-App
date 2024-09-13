import app from "./firebase";
let db = null;
async function loadFirestore() {
  if (!db) {
    const { getFirestore } = await import('firebase/firestore');
    db = getFirestore(app);
  }
  return db;
}
export  {loadFirestore} ;