// Terminal.tsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

interface TerminalProps {
  output: string[];
  setOutput: React.Dispatch<React.SetStateAction<string[]>>;
}

const Terminal: React.FC<TerminalProps> = ({ output, setOutput }) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    // Append the command to the output area
    const newOutput = [...output, `> ${input}`];

    try {
      const response = await fetch(`http://localhost:4000/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: input }),
      });
      const data = await response.text();
      newOutput.push(data); // Append response
    } catch (error) {
      newOutput.push("Error: Could not send command to the backend.");
    }

    setOutput(newOutput);
    setInput(""); // Clear input field
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Ingrese comando..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{ backgroundColor: "black", color: "white" }}
            />
            <Button variant="outline-secondary" onClick={handleSubmit}>
              Enviar
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              height: "400px",
              overflowY: "scroll",
              padding: "10px",
            }}
          >
            {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Terminal;
