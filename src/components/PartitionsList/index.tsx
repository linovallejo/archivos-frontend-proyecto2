// PartitionsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
  font-size: 24px;
  margin-right: 10px;
  color: #666;
`;

interface PartitionDto {
  Type: string;
  Start: number;
  Name: string;
  Id: number;
}
interface PartitionsListProps {
  diskFileName: string;
  onSelectPartition: (partitionId: number) => void;
}

const PartitionsList: React.FC<PartitionsListProps> = ({ diskFileName, onSelectPartition }) => {
  const [partitions, setPartitions] = useState<PartitionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<PartitionDto[]>(`http://localhost:4000/list-mounted-partitions-by-disk/${diskFileName}`)
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
                <ListItem key={partition.Id} onClick={() => onSelectPartition(partition.Id)}>
                    <Icon className="material-icons">pie_chart</Icon>
                    {`Name: ${partition.Name}, Type: ${partition.Type}, Start: ${partition.Start}`}
                </ListItem>
            ))}
        </StyledList>
    </div>
);
};

export default PartitionsList;
