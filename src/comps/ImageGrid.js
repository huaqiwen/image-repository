import React from 'react';
import useFirestore from '../fb-hooks/userFirestore'
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
    const docs = useFirestore("images");

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" 
                            key={doc.id} 
                            whileHover={{ opacity: 1 }}
                            layout
                            onClick={() => setSelectedImg(doc.url)}>
                    <motion.img src={doc.url} alt=""
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}/>
                </motion.div>
            )) }
        </div>
    );
}

export default ImageGrid;
