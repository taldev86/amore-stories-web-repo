import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/img/logo.png'

const Navbar = () => {
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <a className='mt-lg-3'>
                                    <Link to='/'>
                                        <img src={Logo} alt />
                                    </Link>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="header__nav">
                                <nav className="header__menu mobile-menu">
                                    <ul>
                                        <li className="active"><a><Link to='/'>Homepage</Link></a></li>
                                        <li><a> <Link to='/Categories'> Categories <span className="arrow_carrot-down" /></Link></a>
                                            <ul className="dropdown">
                                                <li><Link to='/Categories'>Categories</Link></li>
                                                <li><Link to='/ItemDetail'>Item Details</Link></li>
                                                <li><Link to='/BookPages'>Book Reading</Link></li>
                                                <li><Link to='/BlogsData'>Blog</Link></li>
                                                <li><Link to='/BlogDetails'>Blog Details</Link></li>
                                                <li><Link to='/Login'>Log In</Link></li>
                                                <li><Link to='/SignUp'>Sign Up</Link></li>
                                            </ul>
                                        </li>
                                        <li><a ><Link to='/BlogsData'>Our Blog</Link></a></li>
                                        <li><a><Link to='/BookPages'>Read Book</Link></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="header__right mt-3">
                                <a href="#" className="search-switch" style={{ color: "black" }}><span className="icon_search" /></a>
                                <a><Link to='/Login' style={{ color: "black" }}><span className="icon_profile" /></Link></a>
                                <div id="mobile-menu-wrap" style={{ color: "black" }} />

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar