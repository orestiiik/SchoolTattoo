import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase-config";

const BookingsData = () => {
    const [studios, setStudios] = useState([]);
    const q = query(collection(db, 'bookings'))

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
export default BookingsData;