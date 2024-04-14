import React from 'react';
import { Nav } from 'react-bootstrap';

interface SidebarProps {
    onSelectionChange: (selectedKey: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectionChange }) => {
    return (
        <Nav className="flex-column" variant="pills" onSelect={onSelectionChange}>
            <Nav.Link eventKey="terminal">Terminal</Nav.Link>
            {/* Add more Nav.Link items here as needed */}
        </Nav>
    );
};

export default Sidebar;
