import { useState, useEffect} from 'react';
import { fbStorage, fbFirestore, timestamp } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

const useStorage = (files, isPrivate, uploadTags) => {
    const { currentUser } = useAuth();

    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        // promises contains upload tasks for each file in files
        const promises = [];
        files.forEach(file => {
            const storageRef = fbStorage.ref(file.name);
            const collectionRef = fbFirestore.collection("images");
    
            const uploadTask = storageRef.put(file);
            promises.push(uploadTask);

            uploadTask.on("state_change", (snapshot) => {
                let progressPerc = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                setProgress(progressPerc);
            }, (err) => {
                setErr(err);
            }, async () => {        // on complete
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                const uploadedBy = currentUser.uid;
                const tags = uploadTags;
                
                collectionRef.add({ url, createdAt, uploadedBy, tags, isPrivate });
            });
        })

        // after all file upload tasks are complete, set a placeholder url to notify ProgressBar
        Promise.all(promises)
            .then(() => setUrl("https://google.com"));
    }, [files, currentUser, isPrivate, uploadTags]);

    return { url, progress, err };
}

export default useStorage;
