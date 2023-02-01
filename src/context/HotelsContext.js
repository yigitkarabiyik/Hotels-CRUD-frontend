import { useState } from "react";
import { useContext, createContext } from "react";

const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('hotels');
  if(data){
    return JSON.parse(data)
  }
  else
    return []
}

const HotelsContext = createContext()

const HotelsProvider = ({children}) => {
  const [hotels, setHotels] = useState(getDataFromLocalStorage())
  const values = {hotels, setHotels}

  return (
    <HotelsContext.Provider value={values}>
      {children}
    </HotelsContext.Provider>
  )
}

const useHotels = () => useContext(HotelsContext)

export {useHotels, HotelsProvider};