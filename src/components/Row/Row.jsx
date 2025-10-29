import { useState, useRef, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Card from '../Card/Card'

const Row = ({ title, movies, isLargeRow = false }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const handleScroll = (direction) => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleScrollContainer = () => {
    const container = containerRef.current
    if (container) {
      setIsScrolled(container.scrollLeft > 0)
    }
  }

  // Função para centralizar o card no hover
  const centerCardOnHover = useCallback((cardElement) => {
    if (!cardElement || !containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const cardRect = cardElement.getBoundingClientRect()
    
    // Calcula a posição do card em relação ao container
    const cardLeft = cardRect.left - containerRect.left
    const cardRight = cardRect.right - containerRect.left
    const containerWidth = containerRect.width
    
    // Verifica se o card está nas bordas (primeiros ou últimos 200px)
    const isNearLeftEdge = cardLeft < 200
    const isNearRightEdge = cardRight > containerWidth - 200
    
    if (isNearLeftEdge || isNearRightEdge) {
      // Calcula a posição para centralizar o card
      const cardCenter = cardLeft + (cardRect.width / 2)
      const targetScrollLeft = cardCenter - (containerWidth / 2)
      
      // Limita o scroll para não ultrapassar os limites
      const maxScrollLeft = container.scrollWidth - containerWidth
      const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))
      
      // Scroll suave para centralizar
      container.scrollTo({
        left: finalScrollLeft,
        behavior: 'smooth'
      })
    }
  }, [])

  // Função para passar para o Card
  const handleCardHover = useCallback((cardElement) => {
    // Limpa timeout anterior se existir
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Adiciona delay para evitar scroll excessivo
    scrollTimeoutRef.current = setTimeout(() => {
      centerCardOnHover(cardElement)
    }, 300)
  }, [centerCardOnHover])

  if (!movies || movies.length === 0) return null

  return (
    <div className="px-4 md:px-8 py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

      <div className="relative group pb-8">
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
          ref={containerRef}
          id={`row-${title}`}
          onScroll={handleScrollContainer}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth items-start"
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
              onHover={handleCardHover}
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

