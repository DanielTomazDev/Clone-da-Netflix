import { useState, useEffect } from 'react'

/**
 * Hook customizado para detectar scroll da página
 * @returns {boolean} - true se a página foi rolada
 */
const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isScrolled
}

export default useScroll

