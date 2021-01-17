import React, { useEffect } from 'react';
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
        <div className="progress-bar" style={{ width: progress + '%' }}></div>
    )
}

export default ProgressBar;