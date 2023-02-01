import React from 'react'

import {
  Row,
  Col,
} from 'react-bootstrap'
import Card from './Card';
import { useHotels } from '../context/HotelsContext';

function List({hotels, changeScore, removeHotel}) {

  return (
    <>
      { hotels.map(hotel => 
        <Row className='mt-3' key={hotel.create}>
          <Col>
            <Card
              hotel={hotel}
              removeHotel={removeHotel}
              changeScore={changeScore}
              />
          </Col>
        </Row>
      )}
    </>
  )
}

export default List
