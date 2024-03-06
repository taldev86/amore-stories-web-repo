import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../Helpers/Firebase/firebaseConfig'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ReactReader } from 'react-reader'
import parse from 'html-react-parser';
import Epub from 'epubjs';
import BookRender from '../BookReading/BookRender';

const BookDetails = () => {
  const storage = getStorage();

  const location = useLocation();
  const { BookId } = location.state;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chapters_list, setChapters_list] = useState([])
  const [chapterNo, setChapterNo] = useState(0)
  const [CurretnChapterNo, SetCurrentChapterNo] = useState(0)

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      const bookRef = doc(db, "books", BookId); // Assuming your collection is named "books"
      const docSnap = await getDoc(bookRef);
      setLoading(false);
      if (docSnap.exists()) {
        const bookdata = { ...docSnap.data(), id: docSnap.id }
        setBook({ ...docSnap.data(), id: docSnap.id });
        fetchBanners(bookdata.imageURI)
      } else {
        console.log('No such book!');
      }
    };
    getBook();
  }, [BookId]);

  const [bannerUri, setBannerUri] = useState("")


  const fetchBanners = async (imageURI) => {
    // Assuming banners is an array of image URIs in "gs://" format

    const imageRef = ref(storage, imageURI);
    try {
      const url = await getDownloadURL(imageRef);
      setBannerUri(url);
    } catch (error) {
      // console.error('Error fetching banner URL:', error);

    }
  }


  useEffect(() => {
    const fetchChapters = async () => {
      try {
        // Fetch the EPUB file
        const response = await fetch('https://react-reader.metabits.no/files/alice.epub');
        const epubArrayBuffer = await response.arrayBuffer();

        // Initialize the EPUB reader
        const book = Epub(epubArrayBuffer);

        // Wait for the book to be ready
        await book.ready;

        // Extract chapters
        const chapters = book.navigation.toc.map(item => ({
          title: item.label,
          href: item.href
        }));

        setChapters_list(chapters);
      } catch (error) {
        console.error('Error fetching/reading EPUB file:', error);
      }
    };

    fetchChapters();
  }, []);


  const num = 2
  function ChapterListing({ item, index }) {
    return (
      <div key={index} style={{ display: "inline-block", marginRight: "15px", marginBottom: "20px" }}>
        {index < 3 ? (
          <a
            onClick={() => SetCurrentChapterNo(index)}
            style={{ backgroundColor: index === CurretnChapterNo ? "#B50E2C" : "#b7b7b7", color: index === CurretnChapterNo ? "white" : "black" }}>Ch {index + 1}</a>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <a >Ch {index + 1}</a>
            <i className="fa fa-lock" style={{ marginLeft: "5px", color: "#B50E2C" }} />
          </div>
        )}
      </div>
    )
  }


  function BookDetails() {
    return (
      <div className="anime__details__content">
        <div className="row">
          <div className="col-lg-3">
            <div className="anime__details__pic" style={{ backgroundImage: `url(${'../../Assets/img/demo/image (1).jpeg'})` }}>
              <img src={bannerUri != "" ? bannerUri : "https://professionals.tarkett.com/media/img/M/THH_PROTECTWALL_Tisse_Light_Grey.jpg"} className="anime__details__pic" />

              <div className="comment"><i className="fa fa-comments" /> 11</div>
              <div className="view"><i className="fa fa-eye" /> 9141</div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="anime__details__text">
              <div className="anime__details__title">
                <h3>{book.title}</h3>
                <span>{book.author}</span>
              </div>
              <div className="anime__details__rating">
                <div className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </div>
                <span>{book.rating}</span>
              </div>
              <p style={{ color: "#000", whiteSpace: 'pre-wrap' }}>{book?.summary}</p>
              <div className="anime__details__widget">

              </div>
              <div className="anime__details__btn">
                <a href="#" className="follow-btn"><i className="fa fa-heart-o" /> Follow</a>
                <a href="#" className="watch-btn"><span>Read Now</span> <i className="fa fa-angle-right" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div>
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <a href="/"><i className="fa fa-home" /> Home</a>
                  <a href="">Categories</a>
                  <span>Romance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          loading === true || book === null ?
            (
              <div class="d-flex justify-content-center">
                <div class="spinner-border m-5 " role="status">
                  <span class="visually-hidden"></span>
                </div>
              </div>
            ) : (
              <section className="anime-details spad">
                <div className="container">

                  <BookDetails />
                  <BookRender chapterNo={CurretnChapterNo} />
                  <div className="anime__details__episodes">
                    <div className="section-title">
                      <h5>Chapters</h5>
                    </div>

                    {chapters_list.map((item, index) => {
                      return (
                        <ChapterListing item={item} index={index} />


                      )

                    })}

                  </div>

                </div>
              </section>
            )
        }

      </div>


    </div>
  )
}

export default BookDetails



{/* <div className="row">
                <div className="col-lg-8 col-md-8">
                  <div className="anime__details__review">
                    <div className="section-title">
                      <h5>Reviews</h5>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-1.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Chris Curry - <span>1 Hour ago</span></h6>
                        <p>whachikan Just noticed that someone categorized this as belonging to the genre
                          "demons" LOL</p>
                      </div>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-2.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                        <p>Finally it came out ages ago</p>
                      </div>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-3.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                        <p>Where is the episode 15 ? Slow update! Tch</p>
                      </div>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-4.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Chris Curry - <span>1 Hour ago</span></h6>
                        <p>whachikan Just noticed that someone categorized this as belonging to the genre
                          "demons" LOL</p>
                      </div>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-5.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                        <p>Finally it came out ages ago</p>
                      </div>
                    </div>
                    <div className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src="img/anime/review-6.jpg" alt />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                        <p>Where is the episode 15 ? Slow update! Tch</p>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__form">
                    <div className="section-title">
                      <h5>Your Comment</h5>
                    </div>
                    <form action="#">
                      <textarea placeholder="Your Comment" defaultValue={""} />
                      <button type="submit"><i className="fa fa-location-arrow" /> Review</button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="anime__details__sidebar">
                    <div className="section-title">
                      <h5>you might like...</h5>
                    </div>
                    <div className="product__sidebar__view__item set-bg" data-setbg="img/sidebar/tv-1.jpg">
                      <div className="ep">18 / ?</div>
                      <div className="view"><i className="fa fa-eye" /> 9141</div>
                      <h5><a href="#">Boruto: Naruto next generations</a></h5>
                    </div>
                    <div className="product__sidebar__view__item set-bg" data-setbg="img/sidebar/tv-2.jpg">
                      <div className="ep">18 / ?</div>
                      <div className="view"><i className="fa fa-eye" /> 9141</div>
                      <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                    </div>
                    <div className="product__sidebar__view__item set-bg" data-setbg="img/sidebar/tv-3.jpg">
                      <div className="ep">18 / ?</div>
                      <div className="view"><i className="fa fa-eye" /> 9141</div>
                      <h5><a href="#">Sword art online alicization war of underworld</a></h5>
                    </div>
                    <div className="product__sidebar__view__item set-bg" data-setbg="img/sidebar/tv-4.jpg">
                      <div className="ep">18 / ?</div>
                      <div className="view"><i className="fa fa-eye" /> 9141</div>
                      <h5><a href="#">Fate/stay night: Heaven's Feel I. presage flower</a></h5>
                    </div>
                  </div>
                </div>
              </div> */}


