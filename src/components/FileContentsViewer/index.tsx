import React from 'react';

interface FileContentViewerProps {
    content: string;  // Content of the file
    fileName: string;  // Name of the file
    onClose: () => void;  // Function to close the viewer
}

const FileContentViewer: React.FC<FileContentViewerProps> = ({ content, fileName, onClose }) => {
    return (
        <div style={{ position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%', backgroundColor: 'white', padding: '20px', overflowY: 'scroll', border: '1px solid black', zIndex: 1000 }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
            <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>{fileName}</h2>  {/* Header displaying the file name */}
            <pre>{content}</pre>
        </div>
    );
};

export default FileContentViewer;
