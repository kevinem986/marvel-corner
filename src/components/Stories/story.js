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

const getStory = gql`
  query getStory($id: ID!) {
    story(id: $id) {
      id
      title
      description
      resourceURI
      thumbnail
      comics {
        id
        title
        description
        thumbnail
        issueNumber
        format
      }
    }
  }
`;

const imageNotFound =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Story = () => {
  let { id } = useParams();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let currentStorage = JSON.parse(localStorage.getItem("favoriteStories"));

    if (currentStorage != null && currentStorage.length > 0) {
      const index = currentStorage.findIndex((x) => x.id === id);

      if (index >= 0) setFavorite(true);
      else setFavorite(false);
    }
  }, []);

  const { loading, error, data } = useQuery(getStory, {
    variables: { id: id },
  });

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

  const comics = data?.story?.comics || [];

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
      field: "title",
      header: "Title",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "issueNumber",
      header: "Issue Number",
    },
    {
      field: "format",
      header: "Format",
    },
  ];

  const onClickBtn = (e) => {
    setFavorite(e);

    let newStorage = [];
    let newArrayStorage = {};

    newArrayStorage.id = id;
    newArrayStorage.name = data?.story?.title;
    newArrayStorage.thumbnail =
      data?.story?.thumbnail === "" ? imageNotFound : data?.story?.thumbnail;

    let currentStorage = JSON.parse(localStorage.getItem("favoriteStories"));

    if (currentStorage != null && currentStorage.length > 0) {
      const index = currentStorage.findIndex((x) => x.id === id);

      if (index >= 0) currentStorage.splice(index, 1);

      if (e === true) currentStorage.push(newArrayStorage);

      newStorage = currentStorage;
    } else if (e === true) newStorage.push(newArrayStorage);

    localStorage.removeItem("favoriteStories");
    localStorage.setItem("favoriteStories", JSON.stringify(newStorage));
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col md="4" xs="4">
          <h4>Story</h4>
        </Col>
      </Row>
      <Row>
        <Col md="4" xs="4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={
                data?.story?.thumbnail === ""
                  ? imageNotFound
                  : data?.story?.thumbnail
              }
            />
            <Card.Body>
              <Card.Title>{data?.story?.title}</Card.Title>
              <Card.Text>{data?.story?.description}</Card.Text>
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
                  Related Comics:
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
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
                      {comics.map((rowData, index) => {
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
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Story;
