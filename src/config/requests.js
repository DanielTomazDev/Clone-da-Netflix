/**
 * Títulos de filmes para buscar na API OMDB
 * Como a OMDB não tem endpoint de categorias, usamos títulos populares
 */

const requests = {
  // Filmes populares para o banner
  trending: [
    'Guardians of the Galaxy Vol. 2',
    'Spider-Man: No Way Home',
    'Avengers: Endgame',
    'Inception',
    'The Dark Knight',
    'Interstellar',
  ],
  
  // Netflix Originals (filmess de sucesso)
  netflixOriginals: [
    'Extraction',
    'The Irishman',
    'Bird Box',
    'Bright',
    '6 Underground',
    'The Old Guard',
  ],
  
  // Top Rated
  topRated: [
    'The Shawshank Redemption',
    'The Godfather',
    'Pulp Fiction',
    'The Dark Knight',
    'Fight Club',
  ],
  
  // Ação
  actionMovies: [
    'Die Hard',
    'The Matrix',
    'Mad Max: Fury Road',
    'John Wick',
    'Mission: Impossible',
  ],
  
  // Comédia
  comedyMovies: [
    'Superbad',
    'The Hangover',
    'Anchorman',
    'Borat',
    'Zombieland',
  ],
  
  // Terror
  horrorMovies: [
    'The Shining',
    'Get Out',
    'Hereditary',
    'The Conjuring',
    'Halloween',
  ],
  
  // Romance
  romanceMovies: [
    'The Notebook',
    'Titanic',
    'Pride and Prejudice',
    'Before Sunrise',
    'La La Land',
  ],
  
  // Documentários
  documentaries: [
    'Free Solo',
    'The Social Dilemma',
    'Jiro Dreams of Sushi',
    'Won\'t You Be My Neighbor?',
    'Amy',
  ],
  
  // Séries
  topRatedTV: [
    'Game of Thrones',
    'Breaking Bad',
    'The Office',
    'Stranger Things',
    'The Crown',
  ],
}

export default requests

