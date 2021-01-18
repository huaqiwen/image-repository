import { Modal, Button, Form, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const UploadForm = () => {
    // file upload
    const [filesBuffer, setFilesBuffer] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [uploadTags, setUploadTags] = useState([]);

    const [files, setFiles] = useState([]);
    const [err, setErr] = useState(null);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const { currentUser } = useAuth();
    const history = useHistory();
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const handleClose = () => setShowUploadModal(false);

    const uploadBtnClicked = () => {
        // filter valid files to be uploaded
        let validFiles = [];
        filesBuffer.forEach(inputFile => {
            if (inputFile && allowedTypes.includes(inputFile.type)) {
                validFiles.push(inputFile);
                setErr("");
            } else {
                setErr("Invalid file type: " + inputFile.type);
                return;
            }
        });

        // all files ok
        if (validFiles.length === filesBuffer.length) {
            setShowUploadModal(false);
            setFiles(validFiles);
        }
    }

    return (
        <div className="upload-form">
            <form>
                <button type="button" onClick={() => {
                    if (currentUser) {
                        setShowUploadModal(true)
                    } else {
                        history.push("/signup");
                    }
                }}>+</button>

                <div className="output">
                    { err && <div className="error">{ err } </div> }
                    { (files.length !== 0) && 
                        <ProgressBar files={files} setFiles={setFiles} isPrivate={isPrivate} uploadTags={uploadTags}/> 
                    }
                </div>
            </form>

            <Modal show={showUploadModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Share</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {err && <Alert variant="danger">{err}</Alert>}
                    <Form>
                        <Form.Group controlId="formBasicFile">
                            <Form.Label>Select your image</Form.Label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        multiple
                                        onChange={(e) => setFilesBuffer(Array.from(e.target.files))}
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="landscape mountain" 
                                          onChange={(e) => setUploadTags(e.target.value.split(' '))} />
                            <Form.Text className="text-muted">
                                Tags should be seperated by spaces
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Private upload" value="true" onChange={(e) => {
                                setIsPrivate(prev => !prev)
                            }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={uploadBtnClicked}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UploadForm;
