import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

interface DiskListProps {
    onSelectDisk: (disk: string) => void;
}
const DiskList: React.FC<DiskListProps> = ({ onSelectDisk }) => {
    const { apiBaseUrl } = useApiConfig();

    const [disks, setDisks] = useState<string[]>([]);

    useEffect(() => {
        axios.get<string[]>(`${apiBaseUrl}/list-disks`)
            .then(response => {
                setDisks(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch disks:', error);
            });
    }, []);

    return (
        <div>
            <h3>Available Disks:</h3>
            <StyledList>
                {disks.map(disk => (
                    <ListItem key={disk} onClick={() => onSelectDisk(disk)}>
                        <Icon className="material-icons">storage</Icon>
                        {disk}
                    </ListItem>
                ))}
            </StyledList>
        </div>
    );
};

export default DiskList;
