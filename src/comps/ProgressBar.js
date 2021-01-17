import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStorage from '../fb-hooks/useStorage';

const ProgressBar = ({ file, setFile }) => {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        // when url is not null, file finished upload. set file to null to remove progress bar
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    return (
        <motion.div className="progress-bar" 
                    initial={{ width: 0 }}
                    animate={{ width: progress + '%' }}>
        </motion.div>
    )
}

export default ProgressBar;