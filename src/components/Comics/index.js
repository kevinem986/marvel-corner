import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const getComics = gql`
  query getComics($offset: Int, $limit: Int) {
    __type(name: "ComicSort") {
      name
      enumValues {
        name
      }
    }

    comics(
      filter: {}
      orderBy: ISSUE_NUMBER
      pagination: { offset: $offset, limit: $limit }
    ) {
      offset
      total
      limit
      count
      results {
        id
        title
        description
        resourceURI
        thumbnail
        issueNumber
        format
      }
    }
  }
`;

const LIMIT = 5;
const imageNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Comics = () => {
  const { loading, error, data, fetchMore } = useQuery(getComics, {
    variables: { limit: LIMIT },
  });

  const comics = data?.comics?.results || [];

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: comics.length,
        limit: LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevComics = prev?.comics?.results || [];
        const newComics = fetchMoreResult?.comics?.results || [];

        const newData = {
          comics: {
            ...fetchMoreResult.comics,
            results: [...prevComics, ...newComics],
          },
        };

        return newData;
      },
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

  const handleSelect = (e) => {
    alert("Already ordering by issue number.");
  };

  let columnModel = [
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

  return (
    <Container fluid={true}>
      <Row>
        <Col md="12" xs="12">
          <h4>Comics</h4>
        </Col>
      </Row>
      <Row>
        <Col md="4" xs="4">
          <div>
            <DropdownButton
              id="dropdown-basic-button"
              title="Order by Issue Number"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="ASC">Issue Number</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>
      <Row>
        <InfiniteScroll
          dataLength={comics.length}
          next={loadMore}
          hasMore={comics?.length < data?.comics?.total}
          loader={<Spinner animation="border" />}
          height={500}
        >
          <Table striped bordered hover variant="ligth">
            <thead>
              <tr className="bg-info text-center">
                {columnModel.map((col, i) => {
                  return [<th key={i}>{col.header}</th>];
                })}
              </tr>
            </thead>
            <tbody>
              {comics.map((rowData, index) => {
                return [
                  <tr key={index}>
                    {columnModel.map((col, i) => {
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
        </InfiniteScroll>
      </Row>
    </Container>
  );
};

export default Comics;
