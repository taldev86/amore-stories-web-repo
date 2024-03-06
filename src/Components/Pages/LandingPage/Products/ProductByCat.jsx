import React, { useState, useEffect } from 'react'

import BooksData from '../../../Assets/Jsons/BooksData'
import { Link } from 'react-router-dom'
import images from '../../../Assets/img/demo/image (1).jpeg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { collection, getDocs, doc, getDoc, deleteDoc, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { db } from '../../../Helpers/Firebase/firebaseConfig'

const ProductByCat = ({ title, CatId }) => {
    const storage = getStorage();

    const [val, setVal] = useState([])
    const value = collection(db, "books")
    const [loading, setLoading] = useState(false)


    // console.log(val)

    useEffect(() => {
  if(title=== "Top Rated"){


        fetchBooksByRating()
    }
    else{
        fetchBooksByCategory();

    }
    
    }, []);


    const fetchBooksByCategory = async () => {
        setLoading(true);
        const booksQuerySnapshot = await getDocs(query(collection(db, 'books'), where('categories', 'array-contains', CatId)));
        const booksData = booksQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setVal(booksData);
        setLoading(false);
    };

    const fetchBooksByRating = async () => {
        setLoading(true);
        const booksQuerySnapshot = await getDocs(query(collection(db, 'books'), where('rating', '>', 4)));
        const booksData = booksQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setVal(booksData);
        setLoading(false);
    };




    const owlCarouselOptions = {
        // items: 3,
        loop: false,
        margin: 5,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 3, // Adjust the number of items for smaller screens
            },
            600: {
                items: 4, // Adjust the number of items for medium screens
            },
            700: {
                items: 6, // Number of items for larger screens
            },
        },
    };


    const renderRatingStars = (rating) => {
        const filledStars = Math.floor(rating);
        const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - filledStars - halfStar;

        return (
            <>
                {[...Array(filledStars)].map((_, index) => (
                    <i key={index} className="fas fa-star" style={{ color: 'gold' }} />
                ))}
                {halfStar === 1 && <i className="fas fa-star-half-alt" style={{ color: 'gold' }} />}
                {[...Array(emptyStars)].map((_, index) => (
                    <i key={index} className="far fa-star" style={{ color: 'gold' }} />
                ))}
            </>
        );
    };

    function Bookslist ({items}){
const [bannerUri,setBannerUri]=useState("")


useEffect(() => {
    const fetchBanners = async () => {
        // Assuming banners is an array of image URIs in "gs://" format
       
            const imageRef = ref(storage, items.imageURI);
            try {
                const url = await getDownloadURL(imageRef);
                setBannerUri(url);
            } catch (error) {
                // console.error('Error fetching banner URL:', error);
            
        }
    };

    fetchBanners();
}, []); 
        return(

            <>
            <div className="">
                <div className="item">
                    <div className="product__item" >
                        <div className="product__item__pic" >
                        <img src={bannerUri!=""?bannerUri:"https://professionals.tarkett.com/media/img/M/THH_PROTECTWALL_Tisse_Light_Grey.jpg"} className="product__item__pic" />

                            {/* <div className="ep">18 / 18</div>
                            <div className="comment"><i className="fa fa-comments" /> 11</div>
                            <div className="view"><i className="fa fa-eye" /> 9141</div> */}
                        </div>
                        <div className="product__item__text">
                            <ul>
                                <li>Rating {items.rating}</li>
                            </ul>
                            <Link to='/ItemDetail' state={{ BookId: `${items.id}` }}>
                               <p className='Product_Small_Title' href="">{items.title}</p>
                                <p href='' style={{ fontSize: "10px", color: "#b7b7b7" ,marginTop:-10}}>{items.author}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )

    }


    return (
        <div>
            <section className="product spad" style={{ marginTop: title=== "Top Rated"?-50:-180 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="trending__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>{title}</h4>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <a  className="primary-btn" >Total ({val.length})</a>
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
                                                        val.map((items) => {
                                                            return (
                                                              <Bookslist items={items}/>
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

export default ProductByCat  