import { useState, useEffect } from 'react'

/**
 * Hook customizado para buscar dados da API
 * @param {Function} fetchFunction - Função que retorna uma promise com os dados
 * @returns {Object} - { data, loading, error }
 */
const useFetch = (fetchFunction) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchFunction()
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          console.error('Erro ao buscar dados:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}

export default useFetch

