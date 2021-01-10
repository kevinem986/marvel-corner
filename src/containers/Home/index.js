import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { HeaderNavbar, Content } from "../../components";

const Home = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col md="12" xs="12">
          <HeaderNavbar />
        </Col>
      </Row>
      <Row className="mt-3 align-items-center">        
        <Col sm="12" md={{ size: 10, offset: 0 }} >
          <Content />
        </Col>
      </Row>
      <Row>
        <Col md="12" xs="12"></Col>
      </Row>
    </Container>
  );
};

export default Home;
