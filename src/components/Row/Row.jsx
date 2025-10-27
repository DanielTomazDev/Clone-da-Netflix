import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Card from '../Card/Card'

const Row = ({ title, movies, isLargeRow = false }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (direction) => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleScrollContainer = () => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      setIsScrolled(container.scrollLeft > 0)
    }
  }

  if (!movies || movies.length === 0) return null

  return (
    <div className="px-4 md:px-8 py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

      <div className="relative group">
        <button
          onClick={() => handleScroll('left')}
          className={`absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-netflix-black to-transparent p-4 hover:bg-opacity-100 transition-all ${
            isScrolled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Rolar para esquerda"
        >
          <FaChevronLeft className="text-2xl text-white" />
        </button>

        <div
          id={`row-${title}`}
          onScroll={handleScrollContainer}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
            />
          ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-netflix-black to-transparent p-4 hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Rolar para direita"
        >
          <FaChevronRight className="text-2xl text-white" />
        </button>
      </div>
    </div>
  )
}

export default Row

