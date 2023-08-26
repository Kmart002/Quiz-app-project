import React from 'react'
import { Helmet } from 'react-helmet'
import kwizLogo from '../asests/kwizLogo.png'
import { Link } from 'react-router-dom'
// import Play from './Quiz/Play'
import './Home.css'

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home-page</title>
    </Helmet>
    <div className='Home'>
        <section>

          <div>
            <img src={kwizLogo} alt='kwiz-logo'/>
          </div>

          <div className='play-button-container'>
              <ul>
                <li>
                  <Link to="/play">Play</Link>
                </li>
              </ul>
          </div>
          <div className='auth-container'>
            
              <Link to="/login" >Login</Link>
              <Link to="/signUp" >Sign Up</Link>
          </div>
        </section>
    </div>
    
    </>
  )
}

export default Home