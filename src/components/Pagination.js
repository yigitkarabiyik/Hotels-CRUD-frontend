import React from 'react'
import {
  Row,
  Col,
  ButtonGroup,
  Button,
} from 'react-bootstrap'

function Pagination({hotelsPerPage, totalHotels, currentPage, setCurrentPage, paginate}) {
  const pageNumbers = [];
  for(let i=1; i <= Math.ceil(totalHotels / hotelsPerPage); i++){
    pageNumbers.push(i)
  }
  return (
    <Row className='mt-3'>
      <Col md={{ span: 6, offset: 3 }}>
        <ButtonGroup >

          {pageNumbers.includes(currentPage - 1) && 
            <Button
              className='bg-white' variant='light'
              onClick={() => {
                setCurrentPage(currentPage - 1)
                paginate(currentPage - 1)
              }}
              >{'<'}</Button>
          }

          {pageNumbers.map( number => (
            <Button
              key={number}
              className='bg-white' variant='light'
              onClick={() => paginate(number)}
              >{number}</Button>
          ))}
          {pageNumbers.includes(currentPage + 1) && 
            <Button
              className='bg-white' variant='light'
              onClick={() => {
                setCurrentPage(currentPage + 1)
                paginate(currentPage + 1)
              }}
              >{'>'}</Button>
          }

        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default Pagination