import { useState, useEffect} from 'react';
import { fbFirestore } from '../firebase/config';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = fbFirestore.collection(collection)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let documents = [];
                snapshot.forEach(document => {
                    documents.push({...document.data(), id: document.id});
                });
                setDocs(documents);
            });
        
        return () => unsubscribe();
    }, [collection]);

    return docs;
}

export default useFirestore;