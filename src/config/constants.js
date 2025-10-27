export const IMAGE_URL = ''
export const IMAGE_URL_SMALL = ''
export const POSTER_URL = ''
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=Sem+imagem'
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
export const TMDB_IMAGE_URL_W500 = 'https://image.tmdb.org/t/p/w500'
export const TMDB_IMAGE_URL_W1280 = 'https://image.tmdb.org/t/p/w1280'

export const getImageUrl = (url) => {
  if (!url || url === 'N/A') return PLACEHOLDER_IMAGE
  return url
}

export const getHighQualityImage = (originalUrl) => {
  if (!originalUrl || originalUrl === 'N/A') return PLACEHOLDER_IMAGE
  
  let cleanUrl = originalUrl
    .replace(/_SX\d+_\.jpg/, '.jpg')
    .replace(/_SY\d+_\.jpg/, '.jpg')
    .replace(/_UX\d+_\.jpg/, '.jpg')
    .replace(/_UY\d+_\.jpg/, '.jpg')
    .replace(/_AL_\d+_\.jpg/, '.jpg')
    .replace(/\._V1_/, '._V1_')
    .replace(/_CR\d+,/, '')
  
  return cleanUrl
}

export const getTMDBImageByIMDB = async (imdbId, type = 'poster') => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${import.meta.env.VITE_TMDB_API_KEY || ''}&external_source=imdb_id`
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    
    if (data.movie_results && data.movie_results[0]) {
      if (type === 'backdrop') {
        return `${TMDB_IMAGE_URL}${data.movie_results[0].backdrop_path}`
      }
      return `${TMDB_IMAGE_URL_W500}${data.movie_results[0].poster_path}`
    }
    
    if (data.tv_results && data.tv_results[0]) {
      if (type === 'backdrop') {
        return `${TMDB_IMAGE_URL}${data.tv_results[0].backdrop_path}`
      }
      return `${TMDB_IMAGE_URL_W500}${data.tv_results[0].poster_path}`
    }
    
    return null
  } catch (error) {
    console.error('Erro ao buscar imagem HD:', error)
    return null
  }
}

