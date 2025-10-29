import axios from 'axios'

// Configuração da API TMDB
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'fa7e4d688f969937e7c96565355b6d51'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
  },
})

// Função para buscar filmes populares
export const fetchTrending = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/week')
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar trending:', error)
    return []
  }
}

// Função para buscar originais Netflix (simulados com filmes populares)
export const fetchNetflixOriginals = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_companies: '420',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar originais:', error)
    return []
  }
}

// Função para buscar filmes bem avaliados
export const fetchTopRated = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated')
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar top rated:', error)
    return []
  }
}

// Função para buscar filmes de ação
export const fetchActionMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '28',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar ação:', error)
    return []
  }
}

// Função para buscar filmes de comédia
export const fetchComedyMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '35',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar comédia:', error)
    return []
  }
}

// Função para buscar filmes de terror
export const fetchHorrorMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '27',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar terror:', error)
    return []
  }
}

// Função para buscar filmes de romance
export const fetchRomanceMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '10749',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar romance:', error)
    return []
  }
}

// Função para buscar documentários
export const fetchDocumentaries = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: '99',
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar documentários:', error)
    return []
  }
}

// Função para buscar séries bem avaliadas
export const fetchTopRatedTV = async () => {
  try {
    const response = await tmdbApi.get('/tv/top_rated')
    return response.data.results.map(formatTVShow)
  } catch (error) {
    console.error('Erro ao buscar séries:', error)
    return []
  }
}

// Função para buscar detalhes de um filme
export const fetchMovieDetails = async (type, id, season = null) => {
  try {
    console.log('fetchMovieDetails chamado com:', { type, id, season })
    
    if (type === 'movie') {
      // Busca detalhes completos do filme incluindo créditos, imagens e vídeos
      const [movieResponse, creditsResponse, imagesResponse, videosResponse] = await Promise.all([
        tmdbApi.get(`/movie/${id}`),
        tmdbApi.get(`/movie/${id}/credits`),
        tmdbApi.get(`/movie/${id}/images`),
        tmdbApi.get(`/movie/${id}/videos`)
      ])
      
      console.log('Retornando detalhes do filme')
      return formatMovieDetails(movieResponse.data, creditsResponse.data, imagesResponse.data, videosResponse.data)
    } else if (type === 'series') {
      console.log('Buscando detalhes da série')
      // Busca detalhes completos da série incluindo créditos, imagens e vídeos
      const [showResponse, creditsResponse, imagesResponse, videosResponse] = await Promise.all([
        tmdbApi.get(`/tv/${id}`),
        tmdbApi.get(`/tv/${id}/credits`),
        tmdbApi.get(`/tv/${id}/images`),
        tmdbApi.get(`/tv/${id}/videos`)
      ])
      
      console.log('Retornando detalhes da série')
      return formatTVDetails(showResponse.data, creditsResponse.data, imagesResponse.data, videosResponse.data)
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error)
    return null
  }
}

// Função para buscar filmes
export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: query,
        page: 1,
      },
    })
    return response.data.results.map(formatMovie)
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    return []
  }
}

// Função para formatar dados do filme
const formatMovie = (movie) => ({
  id: movie.id.toString(),
  title: movie.title,
  name: movie.title,
  overview: movie.overview,
  backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
  poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
  vote_count: movie.vote_count,
  genre_ids: movie.genre_ids,
  Type: 'movie',
  runtime: movie.runtime,
})

// Função para formatar dados da série
const formatTVShow = (show) => ({
  id: show.id.toString(),
  title: show.name,
  name: show.name,
  overview: show.overview,
  backdrop_path: show.backdrop_path ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` : null,
  poster_path: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
  release_date: show.first_air_date,
  vote_average: show.vote_average,
  vote_count: show.vote_count,
  genre_ids: show.genre_ids,
  Type: 'series',
})

// Função para formatar detalhes do filme
const formatMovieDetails = (movie, credits, images, videos) => ({
  imdbID: movie.id.toString(),
  Title: movie.title,
  Plot: movie.overview,
  Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
  Released: movie.release_date,
  imdbRating: movie.vote_average?.toString(),
  imdbVotes: movie.vote_count?.toString(),
  Genre: movie.genres?.map(g => g.name).join(', '),
  Director: credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A',
  Actors: credits?.cast?.slice(0, 10).map(a => a.name).join(', ') || 'N/A',
  Awards: 'N/A',
  BoxOffice: movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A',
  Rated: movie.adult ? '18+' : 'Livre',
  Writer: credits?.crew?.filter(c => c.job === 'Writer' || c.job === 'Screenplay').map(c => c.name).join(', ') || 'N/A',
  Country: movie.production_countries?.map(c => c.name).join(', ') || 'N/A',
  Metascore: 'N/A',
  Production: movie.production_companies?.map(c => c.name).join(', ') || 'N/A',
  Language: movie.spoken_languages?.map(l => l.name).join(', ') || 'N/A',
  Year: movie.release_date?.split('-')[0] || 'N/A',
  Type: 'movie',
  Response: 'True',
  // Dados adicionais do TMDB
  Runtime: movie.runtime ? `${movie.runtime} min` : 'N/A',
  Budget: movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A',
  Status: movie.status,
  Tagline: movie.tagline,
  Homepage: movie.homepage,
  // Imagens adicionais
  BackdropImages: images?.backdrops?.slice(0, 5).map(img => `https://image.tmdb.org/t/p/original${img.file_path}`) || [],
  PosterImages: images?.posters?.slice(0, 5).map(img => `https://image.tmdb.org/t/p/w500${img.file_path}`) || [],
  // Vídeos/Trailers
  Trailers: videos?.results?.filter(v => v.type === 'Trailer').map(v => ({
    key: v.key,
    name: v.name,
    site: v.site,
    type: v.type
  })) || [],
  // Elenco completo
  Cast: credits?.cast?.slice(0, 20).map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : null,
    order: actor.order
  })) || [],
  // Equipe técnica
  Crew: credits?.crew?.slice(0, 15).map(member => ({
    name: member.name,
    job: member.job,
    department: member.department,
    profile_path: member.profile_path ? `https://image.tmdb.org/t/p/w300${member.profile_path}` : null
  })) || []
})

// Função para formatar detalhes da série
const formatTVDetails = (show, credits, images, videos) => ({
  imdbID: show.id.toString(),
  Title: show.name,
  Plot: show.overview,
  Poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
  Released: show.first_air_date,
  imdbRating: show.vote_average?.toString(),
  imdbVotes: show.vote_count?.toString(),
  Genre: show.genres?.map(g => g.name).join(', '),
  Director: 'N/A',
  Actors: credits?.cast?.slice(0, 10).map(a => a.name).join(', ') || 'N/A',
  Awards: 'N/A',
  BoxOffice: 'N/A',
  Rated: show.adult ? '18+' : 'Livre',
  Writer: 'N/A',
  Country: show.production_countries?.map(c => c.name).join(', ') || 'N/A',
  Metascore: 'N/A',
  Production: show.production_companies?.map(c => c.name).join(', ') || 'N/A',
  Language: show.spoken_languages?.map(l => l.name).join(', ') || 'N/A',
  Year: show.first_air_date?.split('-')[0] || 'N/A',
  Type: 'series',
  totalSeasons: show.number_of_seasons,
  Response: 'True',
  // Dados adicionais do TMDB
  Status: show.status,
  Tagline: show.tagline,
  Homepage: show.homepage,
  EpisodeRunTime: show.episode_run_time?.join(', ') || 'N/A',
  Networks: show.networks?.map(n => n.name).join(', ') || 'N/A',
  // Imagens adicionais
  BackdropImages: images?.backdrops?.slice(0, 5).map(img => `https://image.tmdb.org/t/p/original${img.file_path}`) || [],
  PosterImages: images?.posters?.slice(0, 5).map(img => `https://image.tmdb.org/t/p/w500${img.file_path}`) || [],
  // Vídeos/Trailers
  Trailers: videos?.results?.filter(v => v.type === 'Trailer').map(v => ({
    key: v.key,
    name: v.name,
    site: v.site,
    type: v.type
  })) || [],
  // Elenco completo
  Cast: credits?.cast?.slice(0, 20).map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : null,
    order: actor.order
  })) || [],
  // Equipe técnica
  Crew: credits?.crew?.slice(0, 15).map(member => ({
    name: member.name,
    job: member.job,
    department: member.department,
    profile_path: member.profile_path ? `https://image.tmdb.org/t/p/w300${member.profile_path}` : null
  })) || []
})

