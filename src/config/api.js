/**
 * Configuração da API do OMDB (Open Movie Database)
 * 
 * API Key obtida de: http://www.omdbapi.com
 * 
 * IMPORTANTE: Crie um arquivo .env na raiz do projeto e adicione:
 * VITE_OMDB_API_KEY=sua_api_key_aqui
 */

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY || '27cb353e',
    r: 'json', // Retorna JSON
  },
})

export default api

