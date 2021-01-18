import React, { useState } from 'react';
import useFirestore from '../../fb-hooks/useFirestore'
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
    const docs = useFirestore("images");
    const [onHover, setOnHover] = useState('');

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" 
                            key={doc.id} 
                            whileHover={{ opacity: 1 }}
                            layout
                            onClick={() => setSelectedImg(doc.url)}
                            onMouseOver={() => setOnHover(doc.id)}
                            onMouseOut={() => setOnHover(null)}>
                    <motion.img src={doc.url} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }}/>
                    {onHover === doc.id && 
                        <motion.figcaption initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {"tags: " + doc.tags.join(', ')}
                        </motion.figcaption>
                    }
                </motion.div>
            )) }
        </div>
    );
}

export default ImageGrid;
