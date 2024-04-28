import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportViewer from "../ReportViewer";
import { useApiConfig } from '../../ApiConfigContext';
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
  font-size: 72px; // Larger icon
  margin-right: 10px; // Space between icon and text
  color: #666; // Icon color
`;
interface ReportsProps {
  partitionId: string;
}

interface Report {
  reportFilename: string;
  dotFileName: string;
}

const Reports: React.FC<ReportsProps> = ({ partitionId }) => {
  const { apiBaseUrl } = useApiConfig();

  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/reports?partitionId=${partitionId}`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => console.error("Error fetching reports:", error));
  }, [partitionId]);

  const handleReportClick = async (dotFileName: string) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/get-report`, {
        dotFileName,
      });
      setSelectedReport(response.data.dotCode);
    } catch (error) {
      console.error("Failed to fetch DOT code:", error);
      // Handle errors appropriately
    }
  };

  return (
    <StyledList>
      {reports.map((report, index) => {  
        return ( 
          <ListItem
            key={`${report.reportFilename}-${index}`} // Use the modified name in the key
            onClick={() => handleReportClick(report.dotFileName)}
          >
            <Icon className="material-icons">print</Icon>
            <strong>{report.reportFilename}</strong> 
          </ListItem>
        );
      })}
      {selectedReport && <ReportViewer dotCode={selectedReport} />}
    </StyledList>
  );
  
};

export default Reports;
