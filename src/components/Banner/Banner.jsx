import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { getImageUrl, getHighQualityImage } from '../../config/constants'

const Banner = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]
      setCurrentMovie(randomMovie)
    }
  }, [movies])

  const handlePlay = () => {
    if (currentMovie) {
      navigate(`/movie/${currentMovie.id}/${currentMovie.Type || 'movie'}`)
    }
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (!currentMovie) {
    return (
      <div className="h-screen flex items-center justify-center bg-netflix-black">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <header className="relative h-screen text-white flex items-end">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getHighQualityImage(currentMovie.backdrop_path)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-3xl px-6 md:px-16 pb-32">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          {currentMovie?.title || currentMovie?.name}
        </h1>

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handlePlay}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 md:px-8 md:py-3 rounded flex items-center space-x-2 font-semibold transition-colors"
          >
            <FaPlay />
            <span>Assistir</span>
          </button>
          <button
            onClick={handlePlay}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 md:px-8 md:py-3 rounded flex items-center space-x-2 font-semibold transition-colors"
          >
            <FaInfoCircle />
            <span>Mais informações</span>
          </button>
        </div>

        <p className="text-sm md:text-lg w-full md:max-w-lg leading-relaxed">
          {truncate(currentMovie?.overview, 150)}
        </p>
      </div>
    </header>
  )
}

export default Banner

