import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMovies } from '../../services/movieService'
import { FaTimes } from 'react-icons/fa'
import { getImageUrl } from '../../config/constants'

/**
 * Componente de barra de pesquisa
 */
const SearchBar = ({ query, setQuery, onClose }) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const data = await searchMovies(searchQuery)
      setResults(data)
    } catch (error) {
      console.error('Erro ao buscar:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, handleSearch])

  return (
    <div className="px-4 md:px-8 pb-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar filmes e séries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-gray-800 px-4 py-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          autoFocus
        />
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Resultados da busca */}
      {query && (
        <div className="mt-4 max-h-96 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="py-8 text-center text-gray-400">Buscando...</div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    navigate(`/movie/${item.id}/movie`)
                    onClose()
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
                    <img
                      src={getImageUrl(item.poster_path)}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm truncate">
                    {item.title || item.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

