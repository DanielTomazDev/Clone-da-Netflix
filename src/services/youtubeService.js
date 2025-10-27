export const searchTrailer = (movieTitle) => {
  const searchQuery = encodeURIComponent(`${movieTitle} official trailer`)
  return `https://www.youtube.com/embed?listType=search&list=${searchQuery}&autoplay=1&mute=1`
}

export const getTrailerUrl = (movieTitle, movieYear = '') => {
  const query = `${movieTitle} ${movieYear} official trailer`.trim()
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

