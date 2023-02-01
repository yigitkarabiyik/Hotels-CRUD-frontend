import React from 'react'
import {
  Row,
  Col,
  Form,
} from 'react-bootstrap'
import { TbArrowsUpDown } from 'react-icons/tb'

function Sort({ setSortingDirection}) {

  return (
    <Row className='mt-3'>
      <Col xs={8} >
        <Form.Select
          className='shadow h-100'
          onChange={(e) => {setSortingDirection(e.target.value)}}
        >
          <option value=''>Sıralama</option>
          <option value='increase'>Puan (Artan)</option>
          <option value='decrease'>Puan (Azalan)</option>
        </Form.Select>
      </Col>
    </Row>
  )
}

export default Sort