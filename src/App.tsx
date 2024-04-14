import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar'; 
import Terminal from './components/Terminal';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('terminal');

  const handleSelectionChange = (selectedKey: string | null) => {
    if (selectedKey === null) {
      // Handle the null case or ignore
      // For example, default back to 'terminal' or another component
      setSelectedComponent('terminal');
    } else {
      setSelectedComponent(selectedKey);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Sidebar onSelectionChange={handleSelectionChange} />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {selectedComponent === 'terminal' && <Terminal />}
          {/* You can add more conditions here to render different components based on the selected menu item */}
        </Col>
      </Row>
    </Container>
  );
};


export default App;
