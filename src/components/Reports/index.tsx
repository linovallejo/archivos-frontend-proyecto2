import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ReportsProps {
  partitionId: string;
}

interface Report {
    ReportFileName: string;
    DotFileName: string;
}


const Reports: React.FC<ReportsProps> = ({ partitionId }) => {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/reports?partitionId=${partitionId}`)
            .then(response => {
                setReports(response.data);
            })
            .catch(error => console.error('Error fetching reports:', error));
    }, [partitionId]);

    return (
        <div>
            <h1>Available Reports</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {reports.map((report, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <h2>{report.ReportFileName}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className="material-icons" style={{ fontSize: '48px', color: '#666' }}>insert_drive_file</span>
                            <a href={`http://yourserver.com/reports/${report.ReportFileName}`} target="_blank" rel="noopener noreferrer">
                                View Report
                            </a>
                            <a href={`http://yourserver.com/reports/${report.DotFileName}`} target="_blank" rel="noopener noreferrer">
                                View DOT File
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
