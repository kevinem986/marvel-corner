import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const imageNotFound =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Favorites = () => {
  let storageCharacters = JSON.parse(
    localStorage.getItem("favoriteCharacters")
  );
  let storageComics = JSON.parse(localStorage.getItem("favoriteComics"));
  let storageStories = JSON.parse(localStorage.getItem("favoriteStories"));

  let columnModelCharacters = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "thumbnail",
      header: "Thumbnail",
    },
    {
      field: "name",
      header: "Name",
    },
  ];

  let columnModelComics = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "thumbnail",
      header: "Thumbnail",
    },
    {
      field: "name",
      header: "Title",
    },
  ];

  let columnModelStories = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "thumbnail",
      header: "Thumbnail",
    },
    {
      field: "name",
      header: "Title",
    },
  ];

  return (
    <Container fluid={true}>
      <Row>
        <Col md="4" xs="4">
          <h4>Favorites</h4>
        </Col>
      </Row>
      <Row>
        <Col md="12" xs="12">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Characters:
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Table striped bordered hover variant="ligth">
                    <thead>
                      <tr className="bg-info text-center">
                        {columnModelCharacters.map((col, i) => {
                          return [<th key={i}>{col.header}</th>];
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {storageCharacters.map((rowData, index) => {
                        return [
                          <tr key={index}>
                            {columnModelCharacters.map((col, i) => {
                              return [
                                <td key={i}>
                                  {/* When field is id (col) redirect to detail */}
                                  {col.field === "id" ? (
                                    <Link
                                      to={"/character/" + rowData[col.field]}
                                    >
                                      {rowData[col.field]}
                                    </Link>
                                  ) : // When field is thumbnail set the image (thumbnail) to td
                                  col.field === "thumbnail" ? (
                                    <Image
                                      height="150px"
                                      width="150px"
                                      src={
                                        rowData[col.field] === ""
                                          ? imageNotFound
                                          : rowData[col.field]
                                      }
                                      thumbnail
                                    />
                                  ) : (
                                    rowData[col.field]
                                  )}
                                </td>,
                              ];
                            })}
                          </tr>,
                        ];
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Comics:
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Table striped bordered hover variant="ligth">
                    <thead>
                      <tr className="bg-info text-center">
                        {columnModelComics.map((col, i) => {
                          return [<th key={i}>{col.header}</th>];
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {storageComics.map((rowData, index) => {
                        return [
                          <tr key={index}>
                            {columnModelComics.map((col, i) => {
                              return [
                                <td key={i}>
                                  {/* When field is id (col) redirect to detail */}
                                  {col.field === "id" ? (
                                    <Link to={"/comic/" + rowData[col.field]}>
                                      {rowData[col.field]}
                                    </Link>
                                  ) : // When field is thumbnail set the image (thumbnail) to td
                                  col.field === "thumbnail" ? (
                                    <Image
                                      height="150px"
                                      width="150px"
                                      src={
                                        rowData[col.field] === ""
                                          ? imageNotFound
                                          : rowData[col.field]
                                      }
                                      thumbnail
                                    />
                                  ) : (
                                    rowData[col.field]
                                  )}
                                </td>,
                              ];
                            })}
                          </tr>,
                        ];
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Stories:
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Table striped bordered hover variant="ligth">
                    <thead>
                      <tr className="bg-info text-center">
                        {columnModelStories.map((col, i) => {
                          return [<th key={i}>{col.header}</th>];
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {storageStories.map((rowData, index) => {
                        return [
                          <tr key={index}>
                            {columnModelStories.map((col, i) => {
                              return [
                                <td key={i}>
                                  {/* When field is id (col) redirect to detail */}
                                  {col.field === "id" ? (
                                    <Link to={"/story/" + rowData[col.field]}>
                                      {rowData[col.field]}
                                    </Link>
                                  ) : // When field is thumbnail set the image (thumbnail) to td
                                  col.field === "thumbnail" ? (
                                    <Image
                                      height="150px"
                                      width="150px"
                                      src={
                                        rowData[col.field] === ""
                                          ? imageNotFound
                                          : rowData[col.field]
                                      }
                                      thumbnail
                                    />
                                  ) : (
                                    rowData[col.field]
                                  )}
                                </td>,
                              ];
                            })}
                          </tr>,
                        ];
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
