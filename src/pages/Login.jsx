import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaPlay } from 'react-icons/fa'

/**
 * Página de Login e Registro
 * Permite ao usuário fazer login ou criar uma conta
 */
const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      // Login
      const result = login(email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message)
      }
    } else {
      // Registro
      if (!name || !email || !password) {
        setError('Preencha todos os campos')
        return
      }

      const result = register(name, email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <FaPlay className="text-netflix-red text-4xl" />
            <span className="text-3xl font-bold text-white">Netflix Clone</span>
          </div>
        </div>

        {/* Card de Login/Registro */}
        <div className="bg-black/80 rounded-lg px-8 py-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>

          {error && (
            <div className="bg-red-600 text-white px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded"
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-netflix-red hover:bg-red-700 text-white font-semibold py-3 rounded transition-colors"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? (
                <>Não tem uma conta? <span className="text-white font-semibold">Cadastre-se</span></>
              ) : (
                <>Já tem uma conta? <span className="text-white font-semibold">Faça login</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

