import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [watched, setWatched] = useState([])
  const [watchProgress, setWatchProgress] = useState({})

  // Carrega dados do localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('netflix_user')
    const savedFavorites = localStorage.getItem('netflix_favorites')
    const savedWatched = localStorage.getItem('netflix_watched')
    const savedProgress = localStorage.getItem('netflix_progress')

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedWatched) setWatched(JSON.parse(savedWatched))
    if (savedProgress) setWatchProgress(JSON.parse(savedProgress))
  }, [])

  // Salva dados no localStorage quando mudam
  useEffect(() => {
    if (user) {
      localStorage.setItem('netflix_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('netflix_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('netflix_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('netflix_watched', JSON.stringify(watched))
  }, [watched])

  useEffect(() => {
    localStorage.setItem('netflix_progress', JSON.stringify(watchProgress))
  }, [watchProgress])

  // Função de login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('netflix_users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (foundUser) {
      const userData = { ...foundUser }
      delete userData.password // Remove senha do objeto user
      setUser(userData)
      return { success: true }
    }

    return { success: false, message: 'Email ou senha incorretos' }
  }

  // Função de registro
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('netflix_users') || '[]')
    
    // Verifica se email já existe
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email já cadastrado' }
    }

    // Cria novo usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Em produção, isso seria hashado
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('netflix_users', JSON.stringify(users))

    // Faz login automático
    const userData = { ...newUser }
    delete userData.password
    setUser(userData)

    return { success: true }
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    setFavorites([])
    setWatched([])
    setWatchProgress({})
    localStorage.removeItem('netflix_user')
  }

  // Toggle favorito
  const toggleFavorite = (movie) => {
    if (!user) return false

    const isFav = favorites.find(f => f.id === movie.id)
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== movie.id))
      return false
    } else {
      setFavorites([...favorites, movie])
      return true
    }
  }

  // Verifica se é favorito
  const isFavorite = (movieId) => {
    return favorites.some(f => f.id === movieId)
  }

  // Marcar como assistido
  const markAsWatched = (movie) => {
    if (!user) return false

    const alreadyWatched = watched.find(w => w.id === movie.id)
    if (alreadyWatched) {
      setWatched(watched.filter(w => w.id !== movie.id))
      return false
    } else {
      setWatched([...watched, movie])
      return true
    }
  }

  // Verifica se foi assistido
  const isWatched = (movieId) => {
    return watched.some(w => w.id === movieId)
  }

  // Salvar progresso de visualização
  const saveProgress = (movieId, progress) => {
    if (!user) return

    setWatchProgress({
      ...watchProgress,
      [movieId]: progress,
    })
  }

  // Obter progresso de visualização
  const getProgress = (movieId) => {
    return watchProgress[movieId] || 0
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        watched,
        markAsWatched,
        isWatched,
        saveProgress,
        getProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

