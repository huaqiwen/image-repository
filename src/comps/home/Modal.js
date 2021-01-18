import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg }) => {
    const dismiss = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    return (
        <motion.div className="backdrop" onClick={dismiss}>
            <motion.img src={selectedImg} alt="" 
                        initial={{ y: "-100vh" }}
                        animate={{ y: 0 }}/>
        </motion.div>
    );
}

export default Modal;