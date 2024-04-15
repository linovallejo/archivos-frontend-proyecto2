import React from "react";
import { Nav } from "react-bootstrap";

interface SidebarProps {
  onSelectionChange: (selectedKey: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectionChange }) => {
  return (
    <Nav className="flex-column" variant="pills" onSelect={onSelectionChange}>
      <Nav.Link eventKey="terminal">Terminal</Nav.Link>
      <Nav.Link eventKey="gui">GUI</Nav.Link>
      <Nav.Link eventKey="reports">Reports</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
