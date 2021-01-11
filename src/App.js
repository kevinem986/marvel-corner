import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import { HeaderNavbar, Content } from "./components";

function App() {  
  return (
    <Container fluid={true}>
      <Row>
        <Col md="12" xs="12">
          <HeaderNavbar />
        </Col>
      </Row>
      <Row className="justify-content-center m-2" >        
        <Col md="12" xs="12">
          <Content />
        </Col>
      </Row>
      <Row>
        <Col md="12" xs="12"></Col>
      </Row>
    </Container>
  );
}

export default App;
