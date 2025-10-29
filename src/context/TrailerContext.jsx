import { createContext, useContext, useState } from 'react'

const TrailerContext = createContext()

export const useTrailer = () => {
  const context = useContext(TrailerContext)
  if (!context) {
    throw new Error('useTrailer deve ser usado dentro de um TrailerProvider')
  }
  return context
}

export const TrailerProvider = ({ children }) => {
  const [activeTrailerId, setActiveTrailerId] = useState(null)
  const [activeTrailerData, setActiveTrailerData] = useState(null)

  const startTrailer = (movieId, trailerData) => {
    // Para qualquer trailer ativo anterior
    if (activeTrailerId && activeTrailerId !== movieId) {
      stopTrailer()
    }
    
    setActiveTrailerId(movieId)
    setActiveTrailerData(trailerData)
  }

  const stopTrailer = () => {
    setActiveTrailerId(null)
    setActiveTrailerData(null)
  }

  const isTrailerActive = (movieId) => {
    return activeTrailerId === movieId
  }

  const getActiveTrailerData = () => {
    return activeTrailerData
  }

  return (
    <TrailerContext.Provider
      value={{
        activeTrailerId,
        startTrailer,
        stopTrailer,
        isTrailerActive,
        getActiveTrailerData,
      }}
    >
      {children}
    </TrailerContext.Provider>
  )
}
