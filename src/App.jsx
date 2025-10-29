import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import { TrailerProvider } from './context/TrailerContext'

function App() {
  return (
    <AuthProvider>
      <TrailerProvider>
        <Router future={{ v7_relativeSplatPath: true }}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id/:type" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </TrailerProvider>
    </AuthProvider>
  )
}

export default App

