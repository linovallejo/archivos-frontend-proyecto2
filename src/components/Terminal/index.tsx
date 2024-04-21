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

  const handleBatchSubmit = async () => {
    if (!input.trim()) return;
    const newOutput = [...output, `Batch Command Submitted: ${input}`];

    // Dividir la entrada de comandos 
    const commands = input.split("\n").filter((line) => line.trim() !== "");
    for (const command of commands) {
      try {
        // await fetch(`http://ec2-52-15-68-96.us-east-2.compute.amazonaws.com:4000/execute`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ command }),
        // });
        await fetch(`http://3.18.158.241:4000/execute`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command }),
        });

      } catch (error) {
        newOutput.push(`Error sending command: ${command}`);
      }
    }

    setOutput(newOutput);
    setInput("");
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              as="textarea" 
              placeholder="Ingrese o pegue aquí sus comandos..."
              value={input}
              onChange={handleInputChange}
              style={{
                backgroundColor: "black",
                color: "white",
                height: "500px",
                overflowY: "scroll",
              }}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="btn btn-primary btn-lg active"
              role="button"
              aria-pressed="true"
              onClick={handleBatchSubmit}
            >
              Ejecutar Comandos
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Terminal;
