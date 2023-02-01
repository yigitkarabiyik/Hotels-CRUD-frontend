import React, { useEffect, useState } from 'react'

import Add from './Add'
import Sort from './Sort';
import Pagination from './Pagination';

import { 
  Alert,
  Button,
  Col,
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useHotels } from '../context/HotelsContext';
import List from './List';


function Main() {
  const { hotels, setHotels } = useHotels();

  const [sortingDirection, setSortingDirection] = useState(false);
  const [scoreChanged, setScoreChanged] =useState(false);
  const [hotelAdded, setHotelAdded] =useState(false);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ hotelsPerPage ] = useState(5);

  const [ showDeletedAlert, setShowDeletedAlert ] = useState(false)

  const [ deletedHotel, setDeletedHotel ] = useState(false)

  useEffect(() => {
    sortByDate()
  }, [])

  useEffect(() => {
    if(sortingDirection)
      sortByScore()
    else
      sortByDate()
  }, [hotelAdded, scoreChanged, sortingDirection])

  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels))
  },[hotels])

  function compareScoreThenDate(a,b){
    if(sortingDirection === 'increase')
      if(a.score>b.score)
        return 1
      else if(b.score>a.score)
        return -1
      else
        if(a.updated>b.updated)
          return -1
        else if(b.updated>a.updated)
          return 1
        else
          return 0
    else
      if(a.score>b.score)
        return -1
      else if(b.score>a.score)
        return 1
      else
        if(a.updated>b.updated)
          return -1
        else if(b.updated>a.updated)
          return 1
        else
          return 0

  }

  const sortByDate = () => {
    const sorted = [...hotels].sort((a,b) => b.created - a.created)
    setHotels(sorted)
  }

  const sortByScore = () => {
    const sorted = [...hotels].sort((a,b) => compareScoreThenDate(a,b))
    setHotels(sorted)
  }

  const changeScore = (hotel, process) => {
    setHotels(
      hotels.map(
        h => h.created === hotel.created ?
        {...h, 'score': process === 'add' ?
          hotel.score + 1:
          hotel.score - 1,
          'updated': Date.now(),
        } : h
      )
    )
    setScoreChanged(s => !s)
  }

  const addHotel = (hotelName) => {
    setHotels([...hotels, {
      'name':hotelName,
      'score':0,
      'created': Date.now(),
    }])
    setHotelAdded(h => !h)
  }

  const removeHotel = (hotel) => {
    setDeletedHotel(hotel.name)
    const filteredHotel = hotels.filter(h => h.created !== hotel.created)
    setShowDeletedAlert(true)
    setHotels(filteredHotel)
  }

  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)

  // Change hotel
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  return (
    <Container>
      <Col className='mx-auto mt-5' style={{width: "375px"}}>

          {showDeletedAlert &&
          <Alert variant='success'>
            <strong>{deletedHotel}</strong> Otel başarıyla silinmiştir
            <hr />
            <div className="d-flex justify-content-end">

              <Button variant='success' onClick={() => setShowDeletedAlert(false)}>Tamam</Button>
            </div>
          </Alert>
          }

        <Add addHotel={addHotel} />

        <Sort setSortingDirection={setSortingDirection} />

        <List
          hotels={currentHotels}
          changeScore={changeScore}
          removeHotel={removeHotel}
          />

        <Pagination
          hotelsPerPage={hotelsPerPage}
          totalHotels={hotels.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          paginate={paginate}/>

      </Col>
    </Container>
  )
}


export default Main