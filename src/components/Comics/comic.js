import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const getComic = gql`
  query getComic($id: ID!) {
    comic(id: $id) {
      id
      title
      description
      resourceURI
      thumbnail
      issueNumber
      format
      characters {
        id
        name
        description
        thumbnail
        resourceURI
      }
      stories {
        id
        title
        description
        thumbnail
      }
    }
  }
`;

const imageNotFound =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Comic = () => {
  let { id } = useParams();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let currentStorage = JSON.parse(localStorage.getItem("favoriteComics"));

    if (currentStorage != null && currentStorage.length > 0) {
      const index = currentStorage.findIndex((x) => x.id === id);

      if (index >= 0) setFavorite(true);
      else setFavorite(false);
    }
  }, [id]);

  const { loading, error, data } = useQuery(getComic, {
    variables: { id: id },
  });

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

  const characters = data?.comic?.characters || [];
  const stories = data?.comic?.stories || [];

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
    {
      field: "description",
      header: "Description",
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
      field: "title",
      header: "Title",
    },
  ];

  const onClickBtn = (e) => {
    setFavorite(e);

    let newStorage = [];
    let newArrayStorage = {};
    
    newArrayStorage.id = id;
    newArrayStorage.name = data?.comic?.title;
    newArrayStorage.thumbnail =
      data?.comic?.thumbnail === "" ? imageNotFound : data?.comic?.thumbnail;

    let currentStorage = JSON.parse(localStorage.getItem("favoriteComics"));

    if (currentStorage != null && currentStorage.length > 0) {
      const index = currentStorage.findIndex((x) => x.id === id);

      if (index >= 0) currentStorage.splice(index, 1);

      if (e === true) currentStorage.push(newArrayStorage);

      newStorage = currentStorage;
    } else if (e === true) newStorage.push(newArrayStorage);

    localStorage.removeItem("favoriteComics");
    localStorage.setItem("favoriteComics", JSON.stringify(newStorage));
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col md="4" xs="4">
          <h4>Comic</h4>
        </Col>
      </Row>
      <Row>
        <Col md="4" xs="4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={
                data?.comic?.thumbnail === ""
                  ? imageNotFound
                  : data?.comic?.thumbnail
              }
            />
            <Card.Body>
              <Card.Title>{data?.comic?.title}</Card.Title>
              <Card.Text>{data?.comic?.description}</Card.Text>
              <Button
                variant="danger"
                onClick={() => onClickBtn(true)}
                hidden={favorite}
              >
                Add Favorites
              </Button>
              <Button
                variant="danger"
                onClick={() => onClickBtn(false)}
                hidden={!favorite}
              >
                Delete Favorites
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md="8" xs="8">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Related Characters:
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
                      {characters.map((rowData, index) => {
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
                  Related Stories:
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
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
                      {stories.map((rowData, index) => {
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

export default Comic;
