import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import { Container } from './NavBar'
import avai from './avai.webp'
import '../styles/Videos.css'
import TrailerMovie from '../Trailers/TrailerMovie'

function Movies() {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const [moviesData, setMoviesData] = useState([])
  const [trailer, setTrailer] = useState(false)
  const Shown = input ? 'search' : 'discover'
  const [movieTitle, setMovieTitle] = useState('')
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`
  const Image = 'https://image.tmdb.org/t/p/w500/'

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '42db0efb9c2af5be012841979281eeef',
        query: input
      }
    })
    const results = data.data.results
    setMoviesData(results)
  }
  useEffect(() => {
    setTimeout(() => {
      MovieCall()
    }, 100)
    MovieCall()
  }, [input])
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }
  console.log(moviesData)
  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
      <div className='movies-container'>
      {moviesData.map((movie) =>  {
        return(
        <Fragment>
          <div id={trailer ? 'container' :'NoContainer'}>
            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => MoviesTitle(movie)}/>
            <img src={movie.poster_path ? `${Image}${movie.poster_path}` : avai} alt='' onClick={() => MoviesTitle(movie)}/>
            <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
          </div>
        </Fragment>
        )
      })}
      {trailer ? console.log : <TrailerMovie moviesTitle={movieTitle} toggle={toggle}/>}
      <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)}/>
    </div>
    </div>
    </Fragment>
  )
}

export default Movies