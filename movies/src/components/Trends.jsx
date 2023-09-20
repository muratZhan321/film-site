import axios from 'axios'
import { Container } from './NavBar'
import {AiOutlineClose, AiFillPlayCircle} from 'react-icons/ai'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import avai from './avai.webp'
import '../styles/Videos.css'
import TrailerTrending from '../Trailers/TrailerTrending'

function Trends() {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const Api = 'https://api.themoviedb.org/3'
  const TrendsShown = '/trending/all/week'
  const [trendTitle, setTrendTitle] = useState('')
  const [trendsArray, setTrendsArray] = useState([])
  const [trailer, setTrailer] = useState(false)
  const Image = 'https://image.tmdb.org/t/p/w500/'

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: '42db0efb9c2af5be012841979281eeef',
        query: input
      }
    })
    const results = data.data.results
    setTrendsArray(results)
  }
  useEffect(() => {
    setTimeout(() => {
      Trends()
    }, 100)
  }, [input])
  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
          {trendsArray.map((trend) => {
            return(
              <Fragment>
              <div id={trailer ? 'container' :'NoContainer'}>
                <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TrendTitle(trend)}/>
                <img src={trend.poster_path ? `${Image}${trend.poster_path}` : avai} alt='' onClick={() => TrendTitle(trend)}/>
                <h3 id='smaller-Text' className={toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
              </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TrailerTrending TrendTitle={trendTitle} toggle={toggle}/>}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />
      </div>
      </div>
    </Fragment>
  )
}

export default Trends