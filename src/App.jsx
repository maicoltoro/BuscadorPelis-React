import { useState } from 'react'
import './App.css'
import {  Movies } from './Components/Movies'
import { useMovies, useSearch } from './hooks/useMovies'


function App() {
  const [sort,setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies,getMovies } = useMovies({search,sort})

  const handleSubmit = (event) =>{
    event.preventDefault()
    getMovies({ search })
    //const fields = Object.fromEntries(new FormData(event.target))
  }

  const handleSort = () =>{
    setSort(!sort)
  }

  const handleChange = (event)  =>{
    const newSearch = event.target.value
    updateSearch(newSearch)
    //getMovies({ search:newSearch})
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
