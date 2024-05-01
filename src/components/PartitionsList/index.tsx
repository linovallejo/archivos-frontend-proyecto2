// PartitionsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useApiConfig } from '../../ApiConfigContext';


const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

const Icon = styled.span`
  font-size: 96px; // Larger icon
  margin-right: 10px; // Space between icon and text
  color: #666; // Icon color
`;

const BackButton = styled.button`
  margin-top: 20px;
`;

interface PartitionDto {
  Type: string;
  Start: number;
  Name: string;
  Id: number;
}
interface PartitionsListProps {
  diskFileName: string;
  onSelectPartition: (partitionId: string) => void;
  onBack: () => void;
}

const PartitionsList: React.FC<PartitionsListProps> = ({ diskFileName, onSelectPartition, onBack }) => {
  const { apiBaseUrl } = useApiConfig();

  const [partitions, setPartitions] = useState<PartitionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<PartitionDto[]>(`${apiBaseUrl}/list-mounted-partitions-by-disk/${diskFileName}`)
      .then(response => {
        setPartitions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch partitions:', error);
        setLoading(false);
      });
  }, [diskFileName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <h3>Partitions on Disk: {diskFileName}</h3>
        <StyledList>
            {partitions.map(partition => (
                <ListItem key={partition.Id} onClick={() => onSelectPartition(partition.Id.toString())}>
                    <Icon className="material-icons">pie_chart</Icon>
                    {`Name: ${partition.Name}, Type: ${partition.Type}, Start: ${partition.Start}`}
                </ListItem>
            ))}
        </StyledList>
        <BackButton onClick={onBack}>Back to Disk List</BackButton>
    </div>
);
};

export default PartitionsList;
