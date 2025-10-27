import { useState, useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import Row from '../components/Row/Row'
import {
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
  fetchTopRatedTV,
} from '../services/movieService'

const Home = () => {
  const [bannerMovies, setBannerMovies] = useState([])
  const [netflixOriginals, setNetflixOriginals] = useState([])
  const [topRated, setTopRated] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])
  const [horrorMovies, setHorrorMovies] = useState([])
  const [romanceMovies, setRomanceMovies] = useState([])
  const [documentaries, setDocumentaries] = useState([])
  const [topRatedTV, setTopRatedTV] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
          setLoading(true)

          const [
          trendingData,
          originalsData,
          topRatedData,
          actionData,
          comedyData,
          horrorData,
          romanceData,
          documentaryData,
          tvData,
        ] = await Promise.all([
          fetchTrending(),
          fetchNetflixOriginals(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies(),
          fetchRomanceMovies(),
          fetchDocumentaries(),
          fetchTopRatedTV(),
        ])

        // Filtra apenas filmes com imagens válidas
        const filterValidMovies = (movies) =>
          movies.filter((movie) => movie.backdrop_path || movie.poster_path)

        setBannerMovies(filterValidMovies(trendingData))
        setNetflixOriginals(filterValidMovies(originalsData))
        setTopRated(filterValidMovies(topRatedData))
        setActionMovies(filterValidMovies(actionData))
          setComedyMovies(filterValidMovies(comedyData))
          setHorrorMovies(filterValidMovies(horrorData))
          setRomanceMovies(filterValidMovies(romanceData))
          setDocumentaries(filterValidMovies(documentaryData))
          setTopRatedTV(filterValidMovies(tvData))
        } catch (error) {
          console.error('Erro ao carregar dados:', error)
          setLoading(false)
        } finally {
          setLoading(false)
        }
      }

      const timeout = setTimeout(() => {
      setLoading(false)
    }, 15000) // 15 segundos máximo

      loadData()

      return () => clearTimeout(timeout)
    }, [])

    if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-netflix-black">
        <div className="text-center">
          <div className="animate-pulse text-netflix-red text-4xl font-bold mb-4">
            Netflix Clone
          </div>
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-netflix-black">
      <Banner movies={bannerMovies} />

      <main className="relative -mt-32 z-10">
        <Row
          title="Netflix Originals"
          movies={netflixOriginals}
          isLargeRow={true}
        />

        <Row title="Em Alta" movies={topRated} />

        <Row title="Top Séries" movies={topRatedTV} />

        <Row title="Ação" movies={actionMovies} />

        <Row title="Comédia" movies={comedyMovies} />

        <Row title="Terror" movies={horrorMovies} />

        <Row title="Romance" movies={romanceMovies} />

        <Row title="Documentários" movies={documentaries} />
      </main>
    </div>
  )
}

export default Home

