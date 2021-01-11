import React, { useState, useEffect } from "react";
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

const getCharacters = gql`
  query getCharacters($offset: Int, $limit: Int, $orderDesc: Boolean) {
    characters(
      filter: {}
      desc: $orderDesc
      pagination: { offset: $offset, limit: $limit }
    ) {
      total
      limit
      count
      results {
        id
        name
        description
        thumbnail
        resourceURI
      }
    }
  }
`;

const LIMIT = 5;
const imageNotFound =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Characters = () => {
  const [orderByNameDesc, setOrderByNameDesc] = useState(false);
  useEffect(() => {}, [orderByNameDesc]);

  const { loading, error, data, fetchMore } = useQuery(getCharacters, {
    variables: { limit: LIMIT, orderDesc: orderByNameDesc },
  });

  const characters = data?.characters?.results || [];

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: characters.length,
        limit: LIMIT,
        orderDesc: orderByNameDesc,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevCharacters = prev?.characters?.results || [];
        const newCharacters = fetchMoreResult?.characters?.results || [];

        const newData = {
          characters: {
            ...fetchMoreResult.characters,
            results: [...prevCharacters, ...newCharacters],
          },
        };

        return newData;
      },
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

  const handleSelect = (e) => {
    let value = e === "DESC" ? true : false;
    setOrderByNameDesc(value);
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
      field: "name",
      header: "Name",
    },
    {
      field: "description",
      header: "Description",
    },
  ];

  return (
    <Container fluid={true}>
      <Row>
        <Col md="12" xs="12">
          <h4>Characters</h4>
        </Col>
      </Row>
      <Row>
        <Col md="4" xs="4">
          <div>
            <DropdownButton
              id="dropdown-basic-button"
              title="Order by Name"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="ASC">ASC</Dropdown.Item>
              <Dropdown.Item eventKey="DESC">DESC</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>
      <Row>
        <InfiniteScroll
          dataLength={characters.length}
          next={loadMore}
          hasMore={characters?.length < data?.characters?.total}
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
              {characters.map((rowData, index) => {
                return [
                  <tr key={index}>
                    {columnModel.map((col, i) => {
                      return [
                        <td key={i}>
                          {/* When field is id (col) redirect to detail */}
                          {col.field === "id" ? (
                            <Link to={"/character/" + rowData[col.field]}>
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

export default Characters;
