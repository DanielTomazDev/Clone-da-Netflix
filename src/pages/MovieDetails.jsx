import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaPlay, FaCalendarAlt, FaStar, FaClock, FaFilm, FaHeart, FaCheck } from 'react-icons/fa'
import { fetchMovieDetails, fetchMoviesByTitles } from '../services/movieService'
import { getImageUrl } from '../config/constants'
import { useAuth } from '../context/AuthContext'
import Row from '../components/Row/Row'
import Card from '../components/Card/Card'

const MovieDetails = () => {
  const { id, type } = useParams()
  const navigate = useNavigate()
  const { user, isFavorite, isWatched, toggleFavorite, markAsWatched } = useAuth()
  const [movie, setMovie] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [seasons, setSeasons] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSeason, setSelectedSeason] = useState(1)

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true)

        // Busca detalhes do filme
        const details = await fetchMovieDetails('movie', id)
        if (!details || details.Response !== 'True') {
          navigate('/')
          return
        }

        // Converte dados da OMDB para formato interno
        const formattedMovie = {
          id: details.imdbID,
          title: details.Title,
          name: details.Title,
          overview: details.Plot,
          backdrop_path: details.Poster,
          poster_path: details.Poster,
          release_date: details.Released,
          vote_average: details.imdbRating ? parseFloat(details.imdbRating) : 0,
          vote_count: details.imdbVotes ? parseInt(details.imdbVotes.replace(/,/g, '')) : 0,
          genre_ids: details.Genre ? details.Genre.split(', ').map(g => g.trim()) : [],
          runtime: parseInt(details.Runtime?.replace(' min', '')) || 0,
          Director: details.Director,
          Actors: details.Actors,
          Awards: details.Awards,
          BoxOffice: details.BoxOffice,
          Rated: details.Rated,
          Writer: details.Writer,
          Country: details.Country,
          Metascore: details.Metascore,
          Production: details.Production,
          Released: details.Released,
          Genre: details.Genre,
          Language: details.Language,
          Year: details.Year,
          Type: details.Type,
          totalSeasons: details.totalSeasons,
        }

        setMovie(formattedMovie)

        // Se for série, busca informações de episódios
        if (details.Type === 'series' && details.totalSeasons) {
          const seasonsNumber = parseInt(details.totalSeasons)
          const seasonPromises = []

          for (let i = 1; i <= seasonsNumber && i <= 5; i++) {
            seasonPromises.push(
              fetchMovieDetails('series', id, i)
            )
          }

          const seasonData = await Promise.all(seasonPromises)
          setSeasons(seasonData.filter(s => s && s.Response === 'True'))
          
          // Se tem temporada selecionada, busca episódios
          if (seasonData[0] && seasonData[0].Episodes) {
            setEpisodes(seasonData[0].Episodes)
          }
        }

        // Busca filmes recomendados baseados no gênero
        if (details.Genre) {
          const genres = details.Genre.split(', ')
          const recommendedTitle = genres[0]
          const recommendations = await fetchMoviesByTitles([recommendedTitle])
          setRecommendedMovies(recommendations.slice(0, 8))
        }

      } catch (error) {
        console.error('Erro ao carregar detalhes:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    loadMovieDetails()
  }, [id, navigate])

  const handleSeasonChange = async (seasonNumber) => {
    setSelectedSeason(seasonNumber)
    setLoading(true)
    
    try {
      const seasonData = await fetchMovieDetails('series', id, seasonNumber)
      if (seasonData && seasonData.Episodes) {
        setEpisodes(seasonData.Episodes)
      }
    } catch (error) {
      console.error('Erro ao carregar episódios:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-netflix-red text-6xl mb-4">⏳</div>
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl mb-4">Filme não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-netflix-red hover:bg-red-700 rounded transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Duração não disponível'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Banner superior com imagem de fundo */}
      <div className="relative h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/50 to-transparent" />
        
        {/* Botão voltar */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-10 flex items-center space-x-2 px-4 py-2 bg-black/60 hover:bg-black/80 rounded-lg transition-colors"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>

        {/* Informações do filme no banner */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt />
              <span>{movie.Year || formatDate(movie.release_date)}</span>
            </div>

            {movie.runtime > 0 && (
              <div className="flex items-center space-x-2">
                <FaClock />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average?.toFixed(1)}/10</span>
            </div>

            {movie.Rated && (
              <span className="px-3 py-1 border border-white/50 rounded">
                {movie.Rated}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            {movie.genre_ids?.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-netflix-red rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-lg max-w-3xl leading-relaxed mb-6">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-netflix-red hover:bg-red-700 px-8 py-3 rounded flex items-center space-x-2 font-semibold transition-colors">
              <FaPlay />
              <span>Assistir</span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded flex items-center space-x-2 font-semibold transition-colors">
              <FaFilm />
              <span>Trailer</span>
            </button>

            {user && (
              <>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`${
                    isFavorite(movie.id)
                      ? 'bg-netflix-red text-white hover:bg-red-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  } px-8 py-3 rounded flex items-center space-x-2 font-semibold transition-colors`}
                >
                  <FaHeart />
                  <span>{isFavorite(movie.id) ? 'Favorito' : 'Adicionar aos Favoritos'}</span>
                </button>

                <button
                  onClick={() => markAsWatched(movie)}
                  className={`${
                    isWatched(movie.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  } px-8 py-3 rounded flex items-center space-x-2 font-semibold transition-colors`}
                >
                  <FaCheck />
                  <span>{isWatched(movie.id) ? 'Assistido' : 'Marcar como Assistido'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="px-6 md:px-16 py-8">
        {/* Informações detalhadas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Informações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movie.Director && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Diretor</h3>
                <p className="text-white">{movie.Director}</p>
              </div>
            )}

            {movie.Writer && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Roteiro</h3>
                <p className="text-white">{movie.Writer}</p>
              </div>
            )}

            {movie.Actors && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Elenco</h3>
                <p className="text-white">{movie.Actors}</p>
              </div>
            )}

            {movie.Country && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">País</h3>
                <p className="text-white">{movie.Country}</p>
              </div>
            )}

            {movie.Language && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Idioma</h3>
                <p className="text-white">{movie.Language}</p>
              </div>
            )}

            {movie.BoxOffice && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Bilheteria</h3>
                <p className="text-white">{movie.BoxOffice}</p>
              </div>
            )}

            {movie.Awards && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Prêmios</h3>
                <p className="text-white">{movie.Awards}</p>
              </div>
            )}
          </div>
        </section>

        {/* Episódios (para séries) */}
        {movie.Type === 'series' && seasons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Episódios</h2>
              <select
                value={selectedSeason}
                onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                {seasons.map((season, index) => (
                  <option key={index} value={index + 1}>
                    Temporada {index + 1}
                  </option>
                ))}
              </select>
            </div>

            {episodes.length > 0 ? (
              <div className="space-y-4">
                {episodes.map((episode, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-netflix-red rounded-lg flex items-center justify-center font-bold">
                        {episode.Episode || index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {episode.Title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{episode.Released}</span>
                          <span>{episode.Runtime}</span>
                          {episode.imdbRating && (
                            <span className="flex items-center space-x-1">
                              <FaStar className="text-yellow-400" />
                              <span>{episode.imdbRating}</span>
                            </span>
                          )}
                        </div>
                        {episode.Plot && (
                          <p className="text-gray-300 mt-2">{episode.Plot}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Carregando episódios...</p>
            )}
          </section>
        )}

        {/* Filmes recomendados */}
        {recommendedMovies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recomendados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendedMovies.map((recMovie) => (
                <div
                  key={recMovie.id}
                  onClick={() => navigate(`/movie/${recMovie.id}/movie`)}
                  className="cursor-pointer"
                >
                  <Card movie={recMovie} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetails

