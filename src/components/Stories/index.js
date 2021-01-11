import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";

const getStories = gql`
  query getStories($offset: Int, $limit: Int) {
    stories(pagination: { offset: $offset, limit: $limit }) {
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
      }
    }
  }
`;

const LIMIT = 5;
const imageNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

const Stories = () => {
  const { loading, error, data, fetchMore } = useQuery(getStories, {
    variables: { limit: LIMIT },
  });

  const stories = data?.stories?.results || [];

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: stories.length,
        limit: LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevStories = prev?.stories?.results || [];
        const newStories = fetchMoreResult?.stories?.results || [];

        const newData = {
          stories: {
            ...fetchMoreResult.stories,
            results: [...prevStories, ...newStories],
          },
        };

        return newData;
      },
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

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
    }
  ];

  return (
    <Container fluid={true}>
      <Row>
        <Col md="12" xs="12">
          <h4>Stories</h4>
        </Col>
      </Row>
      <Row>
        <InfiniteScroll
          dataLength={stories.length}
          next={loadMore}
          hasMore={stories?.length < data?.stories?.total}
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
              {stories.map((rowData, index) => {
                return [
                  <tr key={index}>
                    {columnModel.map((col, i) => {
                      return [
                        <td key={i}>
                          {col.field === "thumbnail" ? (
                            <Image
                              height="150px"
                              width="150px"
                              src={rowData[col.field] === "" ? imageNotFound : rowData[col.field]}
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

export default Stories;
