import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar'; 
import Terminal from './components/Terminal';
import DiskList from './components/DiskList';
import Reports from './components/Reports';
import Login from './components/Login';
import FileExplorer from './components/FileExplorer';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('terminal');

  const handleSelectionChange = (selectedKey: string | null) => {
    setSelectedComponent(selectedKey || 'terminal');
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Sidebar onSelectionChange={handleSelectionChange} />
        </Col>
        <Col xs={10} id="page-content-wrapper">
        {selectedComponent === 'terminal' && <Terminal />}
          {selectedComponent === 'gui' && <DiskList />}
          {selectedComponent === 'reports' && <Reports />}          {/* You can add more conditions here to render different components based on the selected menu item */}
        </Col>
      </Row>
    </Container>
  );
};


export default App;
