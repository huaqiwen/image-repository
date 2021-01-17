import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
    const [files, setFiles] = useState([]);
    const [err, setErr] = useState(null);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const onChange = async (e) => {
        // filter valid files to be uploaded
        let validFiles = [];
        Array.from(e.target.files).forEach(inputFile => {
            if (inputFile && allowedTypes.includes(inputFile.type)) {
                validFiles.push(inputFile);
                setErr("");
            } else {
                setErr("Invalid file type: " + inputFile.type);
            }
        });

        setFiles(validFiles);
    }

    return (
        <form>
            <label>
                <input type="file" multiple="multiple" onChange={onChange}/>
                <span>+</span>
            </label>
            <div className="output">
                { err && <div className="error">{ err } </div> }
                { (files.length !== 0) && <ProgressBar files={files} setFiles={setFiles}/> }
            </div>
        </form>
    )
}

export default UploadForm;
