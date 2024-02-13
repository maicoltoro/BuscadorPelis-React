import { useCallback, useMemo, useRef, useState } from "react"
import { useEffect } from "react"
import { searchMovies } from "../services/movies"

export function useMovies ({search,sort}) {

    const [movies, setMovies] = useState([])
    const previousSearch = useRef(search)
    
    const getMovies = useCallback( async({ search }) =>{
        if(search == previousSearch.current) return
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      
    },[])

    const sortedMovies = useMemo(() =>{
       return sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      :movies
    },[sort,movies])

    return {movies : sortedMovies,getMovies}
}

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}