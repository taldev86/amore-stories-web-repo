import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../Helpers/Firebase/firebaseConfig'

const HeroSection = () => {

  const [banners, setBanners] = useState([
    {
      id:1
    }
  ])
  const [loading, setLoading] = useState(false)
  const value = collection(db, "banners")

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true)
  //     const dbVal = await getDocs(value)
  //     setLoading(false)
  //     setBanners(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getData()
  // }, [])

  const owlCarouselOptions = {
    items: 1, // Set the number of items to 1 to display only one slide
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
  };

  return (
    <div>
      <section className="hero">
        <div className="">
          <div className="hero__slider">
            {
              loading === true ? (
                <div class="d-flex justify-content-center">
                  <div class="spinner-border m-5 " role="status">
                    <span class="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                <OwlCarousel className='owl-theme'  {...owlCarouselOptions}>
                  {
                    banners.map((items) => {
                      return (
                        <>
                          <div className='item'>
                            <div className="hero__items set-bg"  >
                              {/* alt="background image" style={{backgroundImage: `${items.bannerURI}`}} */}
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="hero__text">
                                    {/* <div className="label">Adventure</div>
                                    <h2>The Bourne Identity by Robert Ludlum</h2>
                                    <p>Amnesiac assassin seeks truth, survival.</p> */}
                                    <a  ><span>Read Now</span> <i className="fa fa-angle-right" /></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="card">
                            <img src={items.bannerURI} className="card-img-top" alt="..." />
                            <div className="card-body">
                              <h5 className="card-title">Card title</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                          </div> */}

                          </div>
                        </>
                      )
                    })
                  }

                </OwlCarousel>
              )
            }

          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection