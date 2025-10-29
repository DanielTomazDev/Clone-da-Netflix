// Configurações da aplicação
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// URLs de imagens
export const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg'
  return path
}

export const getHighQualityImage = (path) => {
  if (!path) return '/placeholder.jpg'
  return path
}

// Configurações para trailers
export const TRAILER_CONFIG = {
  // Configurações para trailers
  YOUTUBE_EMBED_BASE: 'https://www.youtube.com/embed/',
  YOUTUBE_WATCH_BASE: 'https://www.youtube.com/watch?v=',
  
  // Parâmetros padrão para embed
  DEFAULT_EMBED_PARAMS: {
    autoplay: 0,
    controls: 1,
    rel: 0,
    modestbranding: 1,
    showinfo: 0
  },
  
  // Fallback para filmes sem trailer
  FALLBACK_MESSAGE: 'Trailer não disponível. Tente buscar no YouTube.'
};