import React, { useState } from 'react'
//import { BsCheckLg } from 'react-icons/bs'
import { BsPlusLg, BsCheckLg } from 'react-icons/bs'
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap'

function Add({addHotel}) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <Row>
      <Col xs={2}>
        <Button
          variant='outline-primary' 
          className='ms-0'
          onClick={() => setModalShow(true)}
          >
          <BsPlusLg />
        </Button>
        <AddModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          addHotel={addHotel}
        />
      </Col>
      <Col >
        <h4 className='fw-bold'>OTEL EKLE</h4>
      </Col>
    </Row>
  )
}

function AddModal(props) {
  const [ hotelName, setHotelName ] = useState('')
  const [ showAlert, setShowAlert ] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addHotel(hotelName)
    setShowAlert(true)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter">
          Otel Adı
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              style={{resize: 'none'}}
              as="textarea" rows={4} size='sm'
              value={hotelName}
              onChange = {(e) => setHotelName(e.target.value)}
              />
          </Form.Group>
        { showAlert &&
          <Alert variant='success'>
            <BsCheckLg /> Otel başarıyla eklenmiştir
          </Alert>
        }
        </Modal.Body>
        <Modal.Footer className='border-0'>
          { showAlert &&
            <Button size='lg' variant='success' onClick={
              () => {props.onHide(); setShowAlert(false);  setHotelName('')}}
              >TAMAM
            </Button>
          }
          { !showAlert &&
            <Button size='lg' type='submit' variant='primary'>EKLE</Button>
          }
        </Modal.Footer>
      </Form>
      
    </Modal>
  );
}

export default Add