import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Characters from "../../components/Characters";

const Home = () => {
  return (
    <Container fluid={true}>
      <Row className="justify-content-center m-2" >        
        <Col md="12" xs="12">
          <Characters />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
