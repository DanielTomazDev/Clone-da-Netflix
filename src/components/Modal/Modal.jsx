import { useEffect } from 'react'
import { FaTimes, FaPlay, FaCalendarAlt, FaStar, FaClock } from 'react-icons/fa'
import { getImageUrl } from '../../config/constants'

/**
 * Componente Modal
 * Exibe detalhes completos de um filme/série
 * @param {Object} movie - Objeto do filme/série
 * @param {Function} onClose - Função para fechar o modal
 */
const Modal = ({ movie, onClose }) => {
  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Impedir scroll do body quando modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!movie) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Duração não disponível'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-netflix-black text-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-netflix-black bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-colors"
          aria-label="Fechar"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Banner superior */}
        <div className="relative h-64 md:h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black" />
        </div>

        {/* Conteúdo do modal */}
        <div className="px-6 md:px-8 pb-8">
          {/* Título e informações principais */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title || movie.name}
                className="rounded-lg shadow-lg w-full max-w-xs"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {movie.title || movie.name}
              </h2>

              {/* Informações principais */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaCalendarAlt />
                  <span>{formatDate(movie.release_date || movie.first_air_date)}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FaClock />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-gray-300">
                  <FaStar className="text-yellow-400" />
                  <span>{movie.vote_average?.toFixed(1)}/10</span>
                </div>
              </div>

              {/* Gêneros */}
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-netflix-red rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Sinopse */}
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'Sinopse não disponível.'}
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex space-x-4 mt-8">
            <button className="bg-netflix-red hover:bg-red-700 px-6 py-3 rounded flex items-center space-x-2 font-semibold transition-colors">
              <FaPlay />
              <span>Assistir Agora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

