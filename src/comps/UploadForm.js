import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [err, setErr] = useState(null);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const onChange = (e) => {
        let inputFile = e.target.files[0];
        
        if (inputFile && allowedTypes.includes(inputFile.type)) {
            setFile(inputFile);
            setErr("");
        } else {
            setFile(null);
            setErr("Invalid file type: " + inputFile.type);
        }
    }

    return (
        <form>
            <label>
                <input type="file" multiple="multiple" onChange={onChange}/>
                <span>+</span>
            </label>
            <div className="output">
                { err && <div className="error">{ err } </div> }
                { file && <div className="file">{ file.name } </div> }
                { file && <ProgressBar file={file} setFile={setFile}/> }
            </div>
        </form>
    )
}

export default UploadForm;
