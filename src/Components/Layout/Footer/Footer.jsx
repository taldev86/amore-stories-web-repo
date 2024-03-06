import React from 'react'
import Logo from '../../Assets/img/logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="page-up">
          <button onClick={() => { window.scrollTo(0, 0) }}><span className="arrow_carrot-up" /></button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer__logo">
                <Link to="/"><img src={Logo} alt /></Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer__nav">
                <ul>
                  <li className="active"><Link to="/">Homepage</Link></li>
                  <li><Link to="/Pricing">Pricing</Link></li>
                  {/* <li><Link to="/Categories">Categories</Link></li>
                  <li><Link to="/BookPages">Our Blog</Link></li>
                  <li><Link to="#">Contacts</Link></li> */}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer