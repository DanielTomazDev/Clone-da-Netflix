/**
 * Serviço para buscar dados de filmes e séries da API OMDB
 */

import api from '../config/api'
import requests from '../config/requests'

/**
 * Busca filmes populares para exibir no banner principal
 */
export const fetchTrending = async () => {
  return await fetchMoviesByTitles(requests.trending)
}

/**
 * Busca Netflix Originals
 */
export const fetchNetflixOriginals = async () => {
  return await fetchMoviesByTitles(requests.netflixOriginals)
}

/**
 * Busca filmes mais bem avaliados
 */
export const fetchTopRated = async () => {
  return await fetchMoviesByTitles(requests.topRated)
}

/**
 * Busca filmes de ação
 */
export const fetchActionMovies = async () => {
  return await fetchMoviesByTitles(requests.actionMovies)
}

/**
 * Busca filmes de comédia
 */
export const fetchComedyMovies = async () => {
  return await fetchMoviesByTitles(requests.comedyMovies)
}

/**
 * Busca filmes de terror
 */
export const fetchHorrorMovies = async () => {
  return await fetchMoviesByTitles(requests.horrorMovies)
}

/**
 * Busca filmes de romance
 */
export const fetchRomanceMovies = async () => {
  return await fetchMoviesByTitles(requests.romanceMovies)
}

/**
 * Busca documentários
 */
export const fetchDocumentaries = async () => {
  return await fetchMoviesByTitles(requests.documentaries)
}

/**
 * Busca séries bem avaliadas
 */
export const fetchTopRatedTV = async () => {
  return await fetchMoviesByTitles(requests.topRatedTV)
}

/**
 * Busca detalhes de um filme/série específico
 */
export const fetchMovieDetails = async (type, id, season = null) => {
  try {
    const params = { i: id }
    
    // Se for busca de temporada de série
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

/**
 * Busca filmes/séries por termo de pesquisa
 */
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

/**
 * Busca múltiplos filmes por títulos específicos (exportado para uso externo)
 */
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

// Exportar para uso externo
export { fetchMoviesByTitles }

