import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportViewer from "../ReportViewer";

interface ReportsProps {
  partitionId: string;
}

interface Report {
  reportFileName: string;
  dotFileName: string;
}

const Reports: React.FC<ReportsProps> = ({ partitionId }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/reports?partitionId=${partitionId}`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => console.error("Error fetching reports:", error));
  }, [partitionId]);

  const handleReportClick = async (dotFileName: string) => {
    try {
      const response = await axios.post(`http://localhost:4000/get-report`, {
        dotFileName,
      });
      setSelectedReport(response.data.dotCode);
    } catch (error) {
      console.error("Failed to fetch DOT code:", error);
      // Handle errors appropriately
    }
  };

  return (
    <div>
      {reports.map((report, index) => (
        <div
          key={`${report.reportFileName}-${index}`}
          onClick={() => handleReportClick(report.dotFileName)}
        >
          <span className="material-icons">description</span>
          {report.reportFileName}
        </div>
      ))}
      {selectedReport && <ReportViewer dotCode={selectedReport} />}
    </div>
  );
};

export default Reports;
