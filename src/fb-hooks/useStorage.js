import { useState, useEffect} from 'react';
import { fbStorage, fbFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const storageRef = fbStorage.ref(file.name);
        const collectionRef = fbFirestore.collection("images");

        storageRef.put(file).on("state_change", (snapshot) => {
            let progressPerc = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            setProgress(progressPerc);
        }, (err) => {
            setErr(err);
        }, async () => {        // on complete
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt });
            setUrl(url);
        });
    }, [file]);

    return { url, progress, err };
}

export default useStorage;
