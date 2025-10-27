import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaHeart, FaCheck, FaClock } from 'react-icons/fa'
import Card from '../components/Card/Card'
import { getImageUrl, getHighQualityImage } from '../config/constants'

/**
 * Página de Perfil do Usuário
 * Mostra informações do usuário, favoritos e assistidos
 */
const Profile = () => {
  const { user, logout, favorites, watched } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white px-6 md:px-16 py-20">
      {/* Header do perfil */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Minha Conta</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-500 text-sm mt-2">
            Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-2">
            <FaHeart className="text-netflix-red text-2xl" />
            <span className="text-gray-400">Favoritos</span>
          </div>
          <p className="text-3xl font-bold">{favorites.length}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-2">
            <FaCheck className="text-green-500 text-2xl" />
            <span className="text-gray-400">Assistidos</span>
          </div>
          <p className="text-3xl font-bold">{watched.length}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-2">
            <FaClock className="text-yellow-500 text-2xl" />
            <span className="text-gray-400">Em Andamento</span>
          </div>
          <p className="text-3xl font-bold">
            {Object.keys({}).length}
          </p>
        </div>
      </div>

      {/* Favoritos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <FaHeart className="text-netflix-red" />
          <span>Meus Favoritos</span>
        </h2>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-12 text-center">
            <FaHeart className="text-gray-600 text-6xl mb-4 mx-auto" />
            <p className="text-gray-400">Você ainda não tem favoritos</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-netflix-red hover:text-red-700"
            >
              Explorar filmes
            </button>
          </div>
        )}
      </section>

      {/* Assistidos */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <FaCheck className="text-green-500" />
          <span>Já Assistidos</span>
        </h2>

        {watched.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watched.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-12 text-center">
            <FaCheck className="text-gray-600 text-6xl mb-4 mx-auto" />
            <p className="text-gray-400">Você ainda não assistiu nenhum filme</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-netflix-red hover:text-red-700"
            >
              Explorar filmes
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile

