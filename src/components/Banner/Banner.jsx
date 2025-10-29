import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaInfoCircle, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { getImageUrl, getHighQualityImage } from '../../config/constants'
import { fetchMovieDetails } from '../../services/movieService'

const Banner = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenCountdown, setFullscreenCountdown] = useState(5)
  const iframeRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]
      setCurrentMovie(randomMovie)
      
      // Reset do estado do trailer ao trocar de filme
      setShowTrailer(false)
      setIsMuted(false)
      setIsFullscreen(false)
      setFullscreenCountdown(5)
      
      // Busca detalhes completos do filme para obter trailers
      loadMovieDetails(randomMovie.id, randomMovie.Type || 'movie')
    }
  }, [movies])

  // Listener para mensagens do YouTube
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://www.youtube.com') return
      
      const data = JSON.parse(event.data)
      if (data.event === 'video-progress') {
        console.log('YouTube API funcionando:', data)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Timer para tela cheia automática
  useEffect(() => {
    let fullscreenTimer
    let countdownTimer
    
    if (showTrailer) {
      // Inicia contagem regressiva
      setFullscreenCountdown(5)
      
      countdownTimer = setInterval(() => {
        setFullscreenCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      // Inicia timer de 5 segundos para tela cheia
      fullscreenTimer = setTimeout(() => {
        setIsFullscreen(true)
      }, 5000)
    }
    
    return () => {
      if (fullscreenTimer) {
        clearTimeout(fullscreenTimer)
      }
      if (countdownTimer) {
        clearInterval(countdownTimer)
      }
    }
  }, [showTrailer])

  // Listener para tecla ESC
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen()
      }
    }

    if (showTrailer) {
      window.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [showTrailer, isFullscreen])

  // Listener para scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showTrailer && window.scrollY > 100) {
        setShowTrailer(false)
        setIsFullscreen(false)
        setFullscreenCountdown(5)
      }
    }

    if (showTrailer) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showTrailer])

  const loadMovieDetails = async (id, type) => {
    try {
      setLoading(true)
      const details = await fetchMovieDetails(type, id)
      if (details && details.Trailers && details.Trailers.length > 0) {
        setMovieDetails(details)
        // Reproduz trailer automaticamente após 3 segundos
        setTimeout(() => {
          setShowTrailer(true)
        }, 3000)
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = () => {
    if (currentMovie) {
      navigate(`/movie/${currentMovie.id}/${currentMovie.Type || 'movie'}`)
    }
  }

  const handleCloseTrailer = () => {
    setShowTrailer(false)
    setIsFullscreen(false)
    setFullscreenCountdown(5)
  }

  const exitFullscreen = () => {
    setIsFullscreen(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    
    // Controla o mute usando a API do YouTube
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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  // Verifica se há trailers disponíveis
  const hasTrailers = movieDetails?.Trailers && movieDetails.Trailers.length > 0
  const youtubeTrailers = hasTrailers ? movieDetails.Trailers.filter(t => t.site === 'YouTube') : []
  const firstTrailer = youtubeTrailers[0]

  if (!currentMovie) {
    return (
      <div className="h-screen flex items-center justify-center bg-netflix-black">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <header className={`relative text-white flex items-end overflow-hidden transition-all duration-500 ${
      isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-screen'
    }`}>
      <div className="absolute inset-0">
        {/* Imagem de fundo com transição */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showTrailer ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${getHighQualityImage(currentMovie.backdrop_path)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Trailer com transição */}
        {showTrailer && firstTrailer && (
          <div className={`absolute inset-0 transition-opacity duration-1000 ${
            showTrailer ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="relative w-full h-full">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${firstTrailer.key}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${firstTrailer.key}&start=0&end=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&enablejsapi=1&origin=${window.location.origin}`}
                title={firstTrailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{
                  transform: 'scale(1.1)',
                  transformOrigin: 'center center'
                }}
              />
              
              {/* Overlay escuro para melhorar legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-black opacity-60" />
            </div>
          </div>
        )}
        
        {/* Gradiente sempre presente */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-black" />
      </div>

      {/* Conteúdo do banner */}
      <div className={`relative z-10 max-w-3xl px-6 md:px-16 pb-32 transition-all duration-500 ${
        isFullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-3xl md:text-6xl font-bold">
            {currentMovie?.title || currentMovie?.name}
          </h1>
        </div>

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

      {/* Controles do trailer */}
      {showTrailer && firstTrailer && (
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-3">
          {/* Botão de mute/unmute - sempre visível */}
          <div className="relative group">
            <button
              onClick={toggleMute}
              className="bg-black bg-opacity-60 hover:bg-opacity-80 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              {isMuted ? (
                <FaVolumeMute className="text-white text-lg md:text-xl" />
              ) : (
                <FaVolumeUp className="text-white text-lg md:text-xl" />
              )}
            </button>
            
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {isMuted ? 'Ativar som' : 'Desativar som'}
            </div>
          </div>
          
          {/* Botão de fechar/sair da tela cheia */}
          <div className="relative group">
            <button
              onClick={isFullscreen ? exitFullscreen : handleCloseTrailer}
              className="bg-black bg-opacity-60 hover:bg-opacity-80 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <FaTimes className="text-white text-lg md:text-xl" />
            </button>
            
            {/* Tooltip dinâmico */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {isFullscreen ? 'Sair da tela cheia' : 'Fechar trailer'}
            </div>
          </div>
        </div>
      )}

      {/* Indicador de trailer */}
      {hasTrailers && !showTrailer && (
        <div className="absolute bottom-20 left-6 md:left-16 z-10">
          <div className="flex items-center space-x-2 text-white/70">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm">Trailer em breve...</span>
          </div>
        </div>
      )}

      {/* Indicador de áudio durante o trailer */}
      {showTrailer && firstTrailer && !isFullscreen && (
        <div className="absolute bottom-20 left-6 md:left-16 z-10">
          <div className="flex items-center space-x-2 text-white/80">
            <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`}></div>
            <span className="text-sm">
              {isMuted ? 'Som desativado' : 'Som ativado'}
            </span>
          </div>
        </div>
      )}

      {/* Indicador de tela cheia */}
      {showTrailer && firstTrailer && isFullscreen && (
        <div className="absolute bottom-20 left-6 md:left-16 z-10">
          <div className="flex items-center space-x-2 text-white/80">
            <span className="text-sm text-yellow-400">Tela cheia ativa</span>
            <span className="text-white/60">•</span>
            <span className="text-xs text-gray-400">ESC para sair</span>
          </div>
        </div>
      )}

      {/* Indicador de contagem regressiva para tela cheia */}
      {showTrailer && firstTrailer && !isFullscreen && fullscreenCountdown > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-full p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{fullscreenCountdown}</span>
            </div>
            <span className="text-white text-sm">Tela cheia em</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Banner

