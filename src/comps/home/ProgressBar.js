import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStorage from '../../fb-hooks/useStorage';

const ProgressBar = ({ files, setFiles, isPrivate, uploadTags }) => {
    const { url, progress } = useStorage(files, isPrivate, uploadTags);

    useEffect(() => {
        // when url is not null, file finished upload. set file to null to remove progress bar
        if (url) {
            setFiles([]);
        }
    }, [url, setFiles]);

    return (
        <motion.div className="progress-bar" 
                    initial={{ width: 0 }}
                    animate={{ width: progress + '%' }}>
        </motion.div>
    )
}

export default ProgressBar;