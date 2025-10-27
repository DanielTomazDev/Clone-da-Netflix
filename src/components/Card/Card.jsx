import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl, getHighQualityImage } from '../../config/constants'
import { useAuth } from '../../context/AuthContext'
import { FaPlay, FaInfoCircle, FaHeart, FaCheck } from 'react-icons/fa'

const Card = ({ movie, isLargeRow = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const { isFavorite, isWatched, toggleFavorite, markAsWatched } = useAuth()

  const containerClass = `relative inline-block ${
    isLargeRow ? 'w-56 min-w-[224px]' : 'w-44 min-w-[176px]'
  }`

  const trailerSearchQuery = encodeURIComponent((movie.title || movie.name) + ' trailer official')
  const trailerUrl = `https://www.youtube.com/embed/videoseries?list=PLrAXtmRdnEQy6nLm8VVY5kNxRLeMGV48o&q=${trailerSearchQuery}`

  const handleClick = () => {
    navigate(`/movie/${movie.id}/${movie.Type || 'movie'}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  const handleWatchedClick = (e) => {
    e.stopPropagation()
    markAsWatched(movie)
  }

  const isFav = isFavorite(movie.id)
  const watched = isWatched(movie.id)

  return (
    <div
      className={containerClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-md group cursor-pointer transition-transform duration-300 hover:scale-105">
        {isHovered ? (
          <iframe
            src={trailerUrl}
            className="w-full object-cover"
            style={{
              height: isLargeRow ? '250px' : '264px',
              pointerEvents: 'none',
            }}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <img
            src={getHighQualityImage(getImageUrl(movie.poster_path))}
            alt={movie.title || movie.name}
            className="w-full object-cover"
            style={{
              height: isLargeRow ? '250px' : '264px',
            }}
          />
        )}

        <div
          className={`absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-sm font-semibold mb-2 truncate">
            {movie.title || movie.name}
          </h3>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-xs">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-300 line-clamp-3 mb-3">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center space-x-1 text-xs transition-colors"
            >
              <FaPlay className="text-xs" />
              <span>Assistir</span>
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`px-3 py-1 rounded flex items-center space-x-1 text-xs transition-colors ${
                isFav
                  ? 'bg-netflix-red text-white hover:bg-red-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <FaHeart className="text-xs" />
            </button>
            <button
              onClick={handleWatchedClick}
              className={`px-3 py-1 rounded flex items-center space-x-1 text-xs transition-colors ${
                watched
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <FaCheck className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        {isFav && (
          <div className="bg-netflix-red rounded-full p-1.5">
            <FaHeart className="text-white text-xs" />
          </div>
        )}
        {watched && (
          <div className="bg-green-600 rounded-full p-1.5">
            <FaCheck className="text-white text-xs" />
          </div>
        )}
      </div>

      {!isHovered && (
        <h3 className="mt-2 text-sm font-medium truncate px-1">
          {movie.title || movie.name}
        </h3>
      )}
    </div>
  )
}

export default Card

