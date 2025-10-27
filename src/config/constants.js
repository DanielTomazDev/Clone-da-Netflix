/**
 * Constantes utilizadas no projeto
 */

// URL base para imagens (OMDB retorna URLs completas de posters)
export const IMAGE_URL = ''

// URL para imagens de menor qualidade (thumbnail)
export const IMAGE_URL_SMALL = ''

// URL para imagens de posters (usando URL completa da API OMDB)
export const POSTER_URL = ''

// Imagem placeholder caso não tenha poster
export const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/500x750?text=Sem+imagem'

// URL do TMDB para imagens em alta qualidade (sem necessidade de API key para imagens)
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
export const TMDB_IMAGE_URL_W500 = 'https://image.tmdb.org/t/p/w500'
export const TMDB_IMAGE_URL_W1280 = 'https://image.tmdb.org/t/p/w1280'

// Helper function para obter a URL da imagem
export const getImageUrl = (url) => {
  if (!url || url === 'N/A') return PLACEHOLDER_IMAGE
  return url
}

// Helper function para melhorar qualidade da imagem
export const getHighQualityImage = (originalUrl) => {
  if (!originalUrl || originalUrl === 'N/A') return PLACEHOLDER_IMAGE
  
  // Remove parâmetros de resize e qualidade da URL do Amazon/IMDB
  let cleanUrl = originalUrl
    .replace(/_SX\d+_\.jpg/, '.jpg')    // Remove resize SX (ex: _SX300_)
    .replace(/_SY\d+_\.jpg/, '.jpg')    // Remove resize SY
    .replace(/_UX\d+_\.jpg/, '.jpg')   // Remove resize UX
    .replace(/_UY\d+_\.jpg/, '.jpg')   // Remove resize UY
    .replace(/_AL_\d+_\.jpg/, '.jpg')  // Remove AL
    .replace(/\._V1_/, '._V1_')        // Mantém V1
    .replace(/_CR\d+,/, '')             // Remove crop parameters
  
  return cleanUrl
}

// Helper para obter URL de alta qualidade do TMDB usando IMDB ID
export const getTMDBImageByIMDB = async (imdbId, type = 'poster') => {
  try {
    // Busca informações do filme no TMDB usando IMDB ID
    const response = await fetch(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${import.meta.env.VITE_TMDB_API_KEY || ''}&external_source=imdb_id`
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    
    // Retorna URL de alta qualidade se disponível
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

