import { useState, useEffect} from 'react';
import { fbFirestore } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

const useFirestore = (collection) => {
    const { currentUser } = useAuth();
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = fbFirestore.collection(collection)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let documents = [];
                snapshot.forEach(document => {
                    const docData = document.data();
                    if (!docData.isPrivate || docData.uploadedBy === (currentUser ? currentUser.uid : "")) {
                        documents.push({...docData, id: document.id});
                    }
                });
                setDocs(documents);
            });
        
        return () => unsubscribe();
    }, [collection, currentUser]);

    return docs;
}

export default useFirestore;