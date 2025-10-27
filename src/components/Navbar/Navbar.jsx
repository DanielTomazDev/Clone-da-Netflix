import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaPlay, FaUser } from 'react-icons/fa'
import useScroll from '../../hooks/useScroll'
import SearchBar from './SearchBar'
import { useAuth } from '../../context/AuthContext'

/**
 * Componente de navegação principal
 * Possui logo, barra de pesquisa e botão de tema
 */
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const isScrolled = useScroll()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-netflix-black shadow-lg'
          : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaPlay className="text-netflix-red text-2xl" />
            <span className="text-xl md:text-2xl font-bold text-white">
              Netflix Clone
            </span>
          </div>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center space-x-2 hover:text-netflix-red transition-colors"
          >
            <FaSearch className="text-xl" />
            <span>Buscar</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 hover:text-netflix-red transition-colors"
              >
                <FaUser className="text-xl" />
                <span>{user.name}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded transition-colors"
            >
              Entrar
            </button>
          )}
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2"
            aria-label="Buscar"
          >
            <FaSearch className="text-xl" />
          </button>

          {user ? (
            <button
              onClick={() => navigate('/profile')}
              className="p-2"
              aria-label="Perfil"
            >
              <FaUser className="text-xl" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1 bg-netflix-red rounded text-sm"
            >
              Entrar
            </button>
          )}
        </div>
      </div>

      {/* Barra de pesquisa expandida */}
      {showSearch && (
        <SearchBar
          query={query}
          setQuery={setQuery}
          onClose={() => setShowSearch(false)}
        />
      )}
    </nav>
  )
}

export default Navbar

