import React, { useEffect, useState } from 'react'
import {
  Form,
  Alert,
  Card,
  Button,
  Row,
  Col,
  Image,
  Modal,
} from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import { MdClose } from 'react-icons/md';
import { useHotels } from '../context/HotelsContext';

function Hotel({hotel, changeScore, removeHotel}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [buttonShow, setButtonShow] = React.useState(false);
  const [cardClass, setCardClass] = React.useState('p-2 border-0 shadow');


  return (
    <Card
      className={cardClass}
      onMouseEnter={() => {
        setCardClass('p-2 border-0 shadow bg-secondary-subtle bg-opacity-25 d-flex align-items-end')
        setButtonShow(true)
      }}
      onMouseLeave={() => {
        setCardClass('p-2 border-0 shadow')
        setButtonShow(false)
      }}
    >
      { buttonShow &&
        <Button
          onClick={() => {setButtonShow(false); setModalShow(true)}}
          variant='danger'
          className='d-flex position-absolute ms-auto'
          style={{
            marginTop: '-1rem', marginRight: '-1rem',
            padding: '1px', paddingBottom: '22px',
            width: '22px', height: '22px', borderRadius: '50%'
          }}
        ><MdClose color='white' size='22px'/>
        </Button>
      }
      <RemoveModal
        show={modalShow}
        onHide={() => { setButtonShow(false); setModalShow(false)}}
        hotel={hotel}
        removeHotel={removeHotel}
      />
      <Row>
        <Col xs={4}>
          <Image fluid rounded 
            src='https://img.freepik.com/free-vector/flat-futuristic-night-city-background_23-2148159287.jpg?auto=format&h=200'
            >
          </Image>
        </Col>
        <Col xs={8}>
          <Row>
            <h5>{hotel.name}</h5>
          </Row>
          <Row>
            <Col xs={8}>
              <p className='bg-secondary-subtle bg-opacity-25 rounded' style={{color:'mediumturquoise'}}>{hotel.score.toFixed(1)} Puan</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant='outline-primary' size='sm' onClick={() => changeScore(hotel, 'add')}>PUAN ARTTIR</Button>
            </Col>
            <Col>
              <Button variant='outline-primary' size='sm' onClick={() => changeScore(hotel, 'subtract')}>PUAN AZALT</Button>
            </Col>
          </Row>

        </Col>
      </Row>
                
    </Card>
  )
}

function RemoveModal(props) {
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className='display-6'>Oteli Sil</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <p style={{fontSize: '26px'}}>
          <strong>{props.hotel.name}</strong>'i silmek istediğinizen emin misiniz?
        </p>
      </Modal.Body>
      <Modal.Footer className='border-0 d-flex justify-content-center'>
        <Button size='lg' onClick={() => {props.removeHotel(props.hotel); props.onHide()}}>OTELİ SİL</Button>
        <Button size='lg' variant='outline-primary' onClick={props.onHide}>VAZGEÇ</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Hotel