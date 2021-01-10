import React from "react";
import { Row, Col, Container, Pagination  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import useUrlQuery from "../../useUrlQuery";

const characters = gql`
    query getCharacters($page: Int, $limit: Int) {
        characters (filter: {}, desc: false, pagination: { offset: $page, limit: $limit }) {
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
}`

const Characters = () => {
  const history = useHistory();
  const urlQuery = useUrlQuery();
  const page = parseInt(urlQuery.get("p") || 0);
  const { loading , error, data } = useQuery(characters, {
      variables: { page, limit: 5}
  }); 

  if (loading) return <Spinner animation="border" />;
  if (error) return `Error! ${error.message}`;

  console.log(data);

  const paginationItems = () => {
      const items = [];

      for (let number = 0; number <= data.characters.count; number++){
          items.push(
              <Pagination.Item
              key={number}
              active={number===page}
              onClick={() => history.push(`/characters?p=${number}`)}>
                  {number}
              </Pagination.Item>
          );
      }

      return items;
  }

  let columnModel = [ 
    {
      field: 'id',
      header: 'ID'
    },
    {
      field: 'thumbnail',
      header: 'Thumbnail'
    },
    {
    field: 'name',
    header: 'Name'
    },
    {
      field: 'description',
      header: 'Description'
    }];

  return (
    <Container fluid={true}>
    <Row>
        <Col md="12" xs="12">
            <h4>Characters</h4>
        </Col>
    </Row>
    <Row>
    <Table striped bordered hover variant="ligth">
        <thead>
            <tr className="bg-info text-center">
                { columnModel.map((col, i) => {
                    return [            
                    <th key={i} >{col.header}</th>   
                    ]
                }) }
            </tr>  
        </thead>
        <tbody>
            {
                data?.characters?.results?.map((rowData, index) => {
                return [
                <tr key={index}>
                    { 
                      columnModel.map((col, i) => {
                        return [            
                            <td key={i}> 
                                { col.field === 'thumbnail' ? <Image height="150px" width="150px" src={rowData[col.field]} thumbnail /> : rowData[col.field] } 
                            </td>   
                        ]
                      }) 
                    }
                </tr>
                ]
                })
            }
        </tbody>
        </Table>
    </Row>
    <Row>
        <Pagination>{paginationItems()}</Pagination>
      </Row>
    </Container>
  );
};

export default Characters;