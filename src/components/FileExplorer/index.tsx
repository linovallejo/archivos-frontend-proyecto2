// FileExplorer.tsx
import React from 'react';

interface FileExplorerProps {
    partitionId: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ partitionId }) => {
    return (
        <div>
            <h2>File Explorer for Partition {partitionId}</h2>
            {/* File and directory listing goes here */}
        </div>
    );
};

export default FileExplorer;
