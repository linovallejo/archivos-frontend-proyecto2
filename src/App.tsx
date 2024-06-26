import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Terminal from "./components/Terminal";
import DiskList from "./components/DiskList";
import PartitionList from "./components/PartitionsList"; // Ensure you have this component
import Login from "./components/Login"; // Ensure you have this component
import FileExplorer from "./components/FileExplorer"; // Ensure you have this component
//import ReportViewer from "./components/ReportViewer";
import Reports from "./components/Reports";
import { ApiConfigProvider } from "./ApiConfigContext";

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<string>("terminal");
  const [selectedDisk, setSelectedDisk] = useState<string | null>(null);
  const [selectedPartition, setSelectedPartition] = useState<string | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);

  const handleSelectionChange = (selectedKey: string | null) => {
    setSelectedComponent(selectedKey || "terminal");
    // Reset disk and partition selections when changing tabs
    if (selectedKey !== "gui" && selectedKey !== "reports") {
      setSelectedDisk(null);
      setSelectedPartition(null);
      setAuthenticated(false);
    }
  };

  const handleDiskSelect = (disk: string) => {
    setSelectedDisk(disk);
    setSelectedPartition(null);
    setAuthenticated(false);
  };

  const handlePartitionSelect = (partitionId: string) => {
    setSelectedPartition(partitionId);
    setAuthenticated(false); // Require re-authentication for new partition selection
  };

  const handleLoginSuccess = (message: string) => {
    setAuthenticated(true);
    alert(message); // Display success message via alert or a modal
  };

  const handleLoginFail = (error: string) => {
    alert(error); // Display error message via alert or a modal
  };

  return (
    <ApiConfigProvider>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar onSelectionChange={handleSelectionChange} />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            {selectedComponent === "terminal" && (
              <Terminal
                output={terminalHistory}
                setOutput={setTerminalHistory}
              />
            )}
            {selectedComponent === "gui" && (
              <div>
                {!selectedDisk && <DiskList onSelectDisk={handleDiskSelect} />}
                {selectedDisk && !selectedPartition && (
                  <PartitionList
                    diskFileName={selectedDisk}
                    onSelectPartition={handlePartitionSelect}
                    onBack={() => { setSelectedDisk(null); }}
                  />
                )}
                {selectedDisk && selectedPartition && !authenticated && (
                  <Login
                    partitionId={selectedPartition}
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFail={handleLoginFail}
                    onBack={() => { setSelectedPartition(null); }}
                  />
                )}
                {selectedDisk && selectedPartition && authenticated && (
                  <FileExplorer partitionId={selectedPartition.toString()} onBack={() => { setSelectedPartition(null); }}/>
                )}
              </div>
            )}
            {selectedComponent === "reports" && selectedPartition && (
              <Reports partitionId={selectedPartition.toString()} />
            )}
          </Col>
        </Row>
      </Container>
    </ApiConfigProvider>
  );
};

export default App;
