import api from '../config/api'
import requests from '../config/requests'

export const fetchTrending = async () => {
  return await fetchMoviesByTitles(requests.trending)
}

export const fetchNetflixOriginals = async () => {
  return await fetchMoviesByTitles(requests.netflixOriginals)
}

export const fetchTopRated = async () => {
  return await fetchMoviesByTitles(requests.topRated)
}

export const fetchActionMovies = async () => {
  return await fetchMoviesByTitles(requests.actionMovies)
}

export const fetchComedyMovies = async () => {
  return await fetchMoviesByTitles(requests.comedyMovies)
}

export const fetchHorrorMovies = async () => {
  return await fetchMoviesByTitles(requests.horrorMovies)
}

export const fetchRomanceMovies = async () => {
  return await fetchMoviesByTitles(requests.romanceMovies)
}

export const fetchDocumentaries = async () => {
  return await fetchMoviesByTitles(requests.documentaries)
}

export const fetchTopRatedTV = async () => {
  return await fetchMoviesByTitles(requests.topRatedTV)
}

export const fetchMovieDetails = async (type, id, season = null) => {
  try {
    const params = { i: id }
    if (season) {
      params.season = season
    }
    
    const response = await api.get('', { params })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error)
    return null
  }
}

export const searchMovies = async (query) => {
  try {
    const response = await api.get('', {
      params: {
        s: query,
        type: 'movie',
      },
    })
    
    if (response.data.Response === 'True' && response.data.Search) {
      return response.data.Search.map(item => ({
        id: item.imdbID,
        title: item.Title,
        name: item.Title,
        poster_path: item.Poster,
        backdrop_path: item.Poster,
        release_date: item.Year,
      }))
    }
    return []
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    return []
  }
}

const fetchMoviesByTitles = async (titles) => {
  try {
    const promises = titles.map(title =>
      api.get('', {
        params: {
          t: title,
          type: 'movie',
        },
      })
    )

    const responses = await Promise.all(promises)
    return responses
      .map(response => response.data)
      .filter(movie => movie.Response === 'True')
      .map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        name: movie.Title,
        overview: movie.Plot,
        backdrop_path: movie.Poster,
        poster_path: movie.Poster,
        release_date: movie.Released,
        vote_average: movie.imdbRating ? parseFloat(movie.imdbRating) : 0,
        vote_count: movie.imdbVotes ? parseInt(movie.imdbVotes.replace(/,/g, '')) : 0,
        genre_ids: movie.Genre ? movie.Genre.split(', ').map(g => g.trim()) : [],
        runtime: parseInt(movie.Runtime?.replace(' min', '')) || 0,
        Director: movie.Director,
        Actors: movie.Actors,
        Awards: movie.Awards,
        BoxOffice: movie.BoxOffice,
        Type: movie.Type,
      }))
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    return []
  }
}

export { fetchMoviesByTitles }

