import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase-config";

const StudiosData = () => {
    const [studios, setStudios] = useState([]);
    const q = query(collection(db, 'studios'))

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            setStudios(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, []);
    return studios;
}
export default StudiosData;