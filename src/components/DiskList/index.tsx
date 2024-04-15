import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import PartitionsList from '../PartitionsList';
import styled from 'styled-components';

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
    const [disks, setDisks] = useState<string[]>([]);
    //const [selectedDisk, setSelectedDisk] = useState<string | null>(null);

    useEffect(() => {
        axios.get<string[]>('http://localhost:4000/list-disks')
            .then(response => {
                setDisks(response.data);
                //setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch disks:', error);
                //setLoading(false);
            });
    }, []);

    // const handleDiskSelect = (disk: string) => {
    //     setSelectedDisk(disk);
    //     // You could also manage state to show partitions here
    // };

    // if (selectedDisk) {
    //     return <Partitions disk={selectedDisk} />;
    // }

    // if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h3>Available Disks:</h3>
            {/* <ul>
                {disks.map(disk => (
                    <li key={disk} onClick={() => handleDiskSelect(disk)}>
                        <span className="material-icons">storage</span> {disk}
                    </li>
                ))}
            </ul> */}
            <StyledList>
                {disks.map(disk => (
                    <ListItem key={disk} onClick={() => onSelectDisk(disk)}>
                        <Icon className="material-icons">storage</Icon>
                        {disk}
                    </ListItem>
                ))}
            </StyledList>
            {/* {selectedDisk && <PartitionsList diskFileName={selectedDisk} />} */}
        </div>
    );
};

export default DiskList;
