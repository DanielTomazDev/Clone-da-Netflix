import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl, getHighQualityImage } from '../../config/constants'
import { useTrailer } from '../../context/TrailerContext'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { fetchMovieDetails } from '../../services/movieService'

const Card = ({ movie, isLargeRow = false, onHover }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [movieDetails, setMovieDetails] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [loading, setLoading] = useState(false)
  const iframeRef = useRef(null)
  const cardRef = useRef(null)
  const navigate = useNavigate()
  const { startTrailer, stopTrailer, isTrailerActive, getActiveTrailerData } = useTrailer()

  const containerClass = `relative inline-block flex-shrink-0 ${
    isLargeRow ? 'w-56 min-w-[224px] h-80' : 'w-44 min-w-[176px] h-64'
  }`

  // Busca detalhes do filme quando hover
  useEffect(() => {
    if (isHovered) {
      loadMovieDetails()
    } else {
      // Para o trailer quando sair do hover
      if (isTrailerActive(movie.id)) {
        stopTrailer()
      }
    }
  }, [isHovered])

  // Listener para mensagens do YouTube
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://www.youtube.com') return
      
      const data = JSON.parse(event.data)
      if (data.event === 'video-progress') {
        console.log('YouTube API funcionando no card:', data)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      
      // Se já temos os detalhes, apenas inicia o trailer
      if (movieDetails && movieDetails.Trailers && movieDetails.Trailers.length > 0) {
        const youtubeTrailers = movieDetails.Trailers.filter(t => t.site === 'YouTube')
        if (youtubeTrailers.length > 0) {
          startTrailer(movie.id, {
            trailer: youtubeTrailers[0],
            movieDetails: movieDetails
          })
        }
        return
      }
      
      const details = await fetchMovieDetails(movie.Type || 'movie', movie.id)
      if (details && details.Trailers && details.Trailers.length > 0) {
        setMovieDetails(details)
        const youtubeTrailers = details.Trailers.filter(t => t.site === 'YouTube')
        if (youtubeTrailers.length > 0) {
          // Inicia trailer após 1 segundo no hover
          setTimeout(() => {
            startTrailer(movie.id, {
              trailer: youtubeTrailers[0],
              movieDetails: details
            })
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const toggleMute = () => {
    setIsMuted(!isMuted)
    
    // Usa postMessage para controlar o YouTube sem recarregar
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ 
          event: 'command', 
          func: command,
          args: ''
        }),
        'https://www.youtube.com'
      )
    }
  }

  // Verifica se este card tem trailer ativo
  const isThisTrailerActive = isTrailerActive(movie.id)
  const activeTrailerData = getActiveTrailerData()
  const showTrailer = isThisTrailerActive && activeTrailerData
  const firstTrailer = showTrailer ? activeTrailerData.trailer : null

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ease-in-out ${
        isHovered 
          ? 'w-[600px] min-w-[600px] h-96 z-50 shadow-2xl' 
          : containerClass
      }`}
      onMouseEnter={() => {
        setIsHovered(true)
        // Chama a função de scroll automático se disponível
        if (onHover && cardRef.current) {
          onHover(cardRef.current)
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        // Para o trailer quando sair do hover
        if (isTrailerActive(movie.id)) {
          stopTrailer()
        }
      }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-md cursor-pointer h-full w-full">
        {/* Imagem de fundo */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showTrailer ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src={getHighQualityImage(getImageUrl(movie.poster_path))}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Indicador de carregamento do trailer */}
        {isHovered && loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-black bg-opacity-80 rounded-full p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            </div>
          </div>
        )}

        {/* Indicador de trailer em breve */}
        {isHovered && !loading && !showTrailer && movieDetails && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
            <div className="bg-black bg-opacity-80 rounded-full p-3">
              <div className="flex items-center space-x-2 text-white text-sm">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span>Trailer em breve...</span>
              </div>
            </div>
          </div>
        )}

        {/* Trailer */}
        {showTrailer && firstTrailer && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            showTrailer ? 'opacity-100' : 'opacity-0'
          }`}>
            <iframe
              ref={iframeRef}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${firstTrailer.key}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${firstTrailer.key}&start=0&end=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&enablejsapi=1&origin=${window.location.origin}`}
              title={firstTrailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay com informações */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-sm font-semibold mb-2 truncate">
            {movie.title || movie.name}
          </h3>

          {/* Informações do filme */}
          <div className="flex items-center space-x-2 mb-2 text-xs text-gray-300">
            <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
            <span>•</span>
            <span>{movieDetails?.Genre || movie.genre_ids?.join(', ') || 'N/A'}</span>
            {movie.Type === 'series' && movieDetails?.totalSeasons && (
              <>
                <span>•</span>
                <span>{movieDetails.totalSeasons} temporada{movieDetails.totalSeasons > 1 ? 's' : ''}</span>
              </>
            )}
            {showTrailer && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`}></div>
                  <span className={isMuted ? 'text-gray-400' : 'text-green-400'}>
                    {isMuted ? 'Mudo' : 'Som ativo'}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-xs">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-300 line-clamp-3 mb-3">
            {movieDetails?.Plot || movie.overview}
          </p>
        </div>

        {/* Controles do trailer */}
        {showTrailer && firstTrailer && (
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            {/* Botão de mute */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleMute()
              }}
              className="bg-black bg-opacity-60 hover:bg-opacity-80 p-1.5 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              {isMuted ? (
                <FaVolumeMute className="text-white text-xs" />
              ) : (
                <FaVolumeUp className="text-white text-xs" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        {/* Indicadores removidos - apenas no hover do trailer */}
      </div>

      {!isHovered && (
        <h3 className="mt-2 text-sm font-medium truncate px-1 absolute -bottom-8 left-0 right-0">
          {movie.title || movie.name}
        </h3>
      )}
    </div>
  )
}

export default Card

