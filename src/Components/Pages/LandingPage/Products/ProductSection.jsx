import React, { useState, useEffect } from 'react'

import BooksData from '../../../Assets/Jsons/BooksData'
import { Link } from 'react-router-dom'
import images from '../../../Assets/img/demo/image (1).jpeg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { collection, getDocs, doc, getDoc, deleteDoc,query,where } from "firebase/firestore";
import { db } from '../../../Helpers/Firebase/firebaseConfig'

const ProductSection = () => {

    const [books, setBooks] = useState([])
    const value = collection(db, "books")
    const [loading, setLoading] = useState(false)

   useEffect(() => {
        const fetchBooksByCategory = async () => {
            setLoading(true);
            const booksQuerySnapshot = await getDocs(query(collection(db, 'books'), where('categories', 'array-contains', 'BJCVpjj2f31Pbcw7NEGZ')));
            const booksData = booksQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            // setVal(booksData);
            setLoading(false);
        };

        fetchBooksByCategory();
    }, []);

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const dbVal = await getDocs(value)
            setLoading(false)
            setBooks(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    }, [])


    const owlCarouselOptions = {
        // items: 3,
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1.2, // Adjust the number of items for smaller screens
            },
            600: {
                items: 2, // Adjust the number of items for medium screens
            },
            700: {
                items: 4.7, // Number of items for larger screens
            },
        },
    };

   



    return (
        <div>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="trending__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>Best Sellers</h4>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <a href="#" className="primary-btn" >View All <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>

                                {
                                    loading === true ? (
                                        <>
                                            <div class="d-flex justify-content-center m-5">
                                                <div class="spinner-border text-dark" role="status">
                                                    <span class="visually-hidden"></span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="row">

                                                <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
                                                    {
                                                        books.map((items) => {
                                                            return (
                                                                <>
                                                                    <div className="m-1">
                                                                        <div className="item">
                                                                            <div className="product__item" >
                                                                                <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.imageURI}` }} >
                                                                                    <div className="ep">18 / 18</div>
                                                                                    <div className="comment"><i className="fa fa-comments" /> 11</div>
                                                                                    <div className="view"><i className="fa fa-eye" /> 9141</div>
                                                                                </div>
                                                                                <div className="product__item__text">
                                                                                    <ul>
                                                                                        <li>Action</li>
                                                                                        <li>Romance</li>
                                                                                    </ul>
                                                                                    <Link to='/ItemDetail' state={{ BookId: `${items.id}` }}>
                                                                                        <h5><a href="">{items.title}</a></h5>
                                                                                        <h5><a href='' style={{ fontSize: "12px", color: "#b7b7b7" }}>{items.author}</a></h5>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </OwlCarousel>

                                            </div>
                                        </>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductSection  
//  return (
//     <div>
//         <section className="product spad">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="trending__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Best Sellers</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn" >View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>

//                             {
//                                 loading === true ? (
//                                     <>
//                                         <div class="d-flex justify-content-center m-5">
//                                             <div class="spinner-border text-dark" role="status">
//                                                 <span class="visually-hidden"></span>
//                                             </div>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <div className="row">

//                                             <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                                 {
//                                                     val.map((items) => {
//                                                         return (
//                                                             <>
//                                                                 <div className="m-1">
//                                                                     <div className="item">
//                                                                         <div className="product__item" >
//                                                                             <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.imageURI}` }} >
//                                                                                 <div className="ep">18 / 18</div>
//                                                                                 <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                                 <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                             </div>
//                                                                             <div className="product__item__text">
//                                                                                 <ul>
//                                                                                     <li>Action</li>
//                                                                                     <li>Romance</li>
//                                                                                 </ul>
//                                                                                 <Link to='/ItemDetail' state={{ BookId: `${items.id}` }}>
//                                                                                     <h5><a href="">{items.title}</a></h5>
//                                                                                     <h5><a href='' style={{ fontSize: "12px", color: "#b7b7b7" }}>{items.author}</a></h5>
//                                                                                 </Link>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </>
//                                                         )
//                                                     })
//                                                 }
//                                             </OwlCarousel>

//                                         </div>
//                                     </>
//                                 )
//                             }

//                         </div>
//                         {/* <div className="popular__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Arranged Marriage</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>

//                             </div>
//                         </div>

//                         <div className="trending__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Billionaire</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>

//                             </div>
//                         </div>
//                         <div className="popular__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Mafia</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>

//                             </div>
//                         </div>

//                         <div className="trending__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Secret Baby</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>

//                             </div>
//                         </div>
//                         <div className="popular__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Sports</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>

//                             </div>
//                         </div>

//                         <div className="popular__product">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-8 col-sm-8">
//                                     <div className="section-title">
//                                         <h4>Surrogate Baby</h4>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4">
//                                     <div className="btn__all">
//                                         <a href="#" className="primary-btn">View All <span className="arrow_right" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">

//                                 <OwlCarousel className='owl-theme' {...owlCarouselOptions}>
//                                     {
//                                         BooksData.map((items) => {
//                                             return (
//                                                 <>
//                                                     <div className="m-1 ">
//                                                         <div className="item">
//                                                             <div className="product__item" >
//                                                                 <div className="product__item__pic set-bg" style={{ backgroundImage: `${items.image}` }} >
//                                                                     <div className="ep">18 / 18</div>
//                                                                     <div className="comment"><i className="fa fa-comments" /> 11</div>
//                                                                     <div className="view"><i className="fa fa-eye" /> 9141</div>
//                                                                 </div>
//                                                                 <div className="product__item__text">
//                                                                     <ul>
//                                                                         <li>Action</li>
//                                                                         <li>Romance</li>
//                                                                     </ul>
//                                                                     <Link to='/ItemDetail'>
//                                                                         <h5><a href="">{items.title}</a></h5>
//                                                                         <h5><a href='' style={{ fontSize: "12px" }}>{items.description}</a></h5>
//                                                                     </Link>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )
//                                         })
//                                     }
//                                 </OwlCarousel>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </div>
// )