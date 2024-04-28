import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FileContentViewer from '../FileContentsViewer';
import { useApiConfig } from '../../ApiConfigContext';

const StyledList = styled.ul`
  list-style-type: none; // Removes bullets
  padding: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  align-items: center; // Aligns the icon and text vertically
  font-size: 1.5em; // Larger text
`;

const Icon = styled.span`
  font-size: 96px; // Larger icon
  margin-right: 10px; // Space between icon and text
  color: #666; // Icon color
`;
interface FileExplorerProps {
    partitionId: string;
}

interface FileExplorerItem {
    name: string;
    inode: number;
    isFolder: boolean;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ partitionId }) => {
    const { apiBaseUrl } = useApiConfig();

    const [items, setItems] = useState<FileExplorerItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState<string>('/');  // track the current directory path
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Fetch the directory or file contents
    useEffect(() => {
        const fetchContents = async (path: string) => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiBaseUrl}/get-root-directory-contents?partitionId=${partitionId}`);
                setCurrentPath(path);
                setItems(response.data.items || response.data.content);  // Set items if directory, content if file
                setLoading(false);
            } catch (err) {
                setError('Failed to load contents');
                setLoading(false);
            }
        };

        fetchContents(currentPath);
    }, [partitionId, currentPath]);

    const handleItemClick = async (item: FileExplorerItem) => {
        if (item.name === '..') {
            if (currentPath !== '/') {  // Prevent going up from the root directory
                setCurrentPath(path => path.replace(/\/[^\/]*\/?$/, ''));  // Go up one directory
            }
        } else if (item.isFolder) {
            setCurrentPath(currentPath + item.name + '/');
        } else {  // Handle file click, fetch file content
            try {
                const response = await axios.post(`${apiBaseUrl}/get-file-contents`, {
                    partitionId: partitionId,
                    path: currentPath + item.name
                });
                setFileContent(response.data.contents);  // Assume the API returns the content directly
                setFileName(item.name);  // Set the file name for display
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch file content:', error);
                alert('Failed to load file content');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>File Explorer for Partition {partitionId}</h2>
            <StyledList>
                {items.map((item, index) => (
                    <ListItem key={index} onClick={() => handleItemClick(item)}>
                        
                        {item.isFolder ? <Icon className="material-icons">folder</Icon> : <Icon className="material-icons">text_snippet</Icon>}
                        {item.name}
                    </ListItem>
                ))}
            </StyledList>
            {fileContent && <FileContentViewer content={fileContent} fileName={currentPath+fileName} onClose={() => setFileContent(null)} />}
        </div>
    );
};

export default FileExplorer;
