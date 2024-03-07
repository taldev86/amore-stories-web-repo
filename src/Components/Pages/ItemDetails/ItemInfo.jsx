import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Helpers/Firebase/firebaseConfig'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './BookStyles.scss'
import parse from 'html-react-parser';
import UserInfo from '../../FirebaseStore/UserInfo';
import { confirmAlert } from 'react-confirm-alert';
import Epub from 'epubjs';
import BookRender from '../BookReading/BookRender';
import { toast } from 'react-toastify';
import { updateDoc, getFirestore } from "firebase/firestore";

const ItemInfo = () => {
  const storage = getStorage();

  const location = useLocation();
  const { BookId } = location.state;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chapters_list, setChapters_list] = useState([])
  const [CurretnChapterNo, SetCurrentChapterNo] = useState(0)
  const [readBook, setReadBook] = useState(false)
  const [bookUrl, setBookUrl] = useState("")
  const [bannerUri, setBannerUri] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      const user = await UserInfo();
      setUser(user)
      const bookRef = doc(db, "books", BookId);
      const docSnap = await getDoc(bookRef);
      setLoading(false);
      if (docSnap.exists()) {
        const bookdata = { ...docSnap.data(), id: docSnap.id }
        setBook({ ...docSnap.data(), id: docSnap.id });
        fetchBanners(bookdata.imageURI)
        getBookUrl(bookdata.bookURL)
      } else {
        console.log('No such book!');
      }
    };
    getBook();
  }, [BookId]);


  const fetchBanners = async (imageURI) => {
    const imageRef = ref(storage, imageURI);
    try {
      const url = await getDownloadURL(imageRef);
      setBannerUri(url);
    } catch (error) {
      console.error('Error fetching banner URL:', error);
    }
  }

  const getBookUrl = async (bookURL) => {
    const path = bookURL.split('.com/')[1];
    const bookRef = ref(storage, path);
    try {
      const url = await getDownloadURL(bookRef);
      setBookUrl(url)
      fetchChapters(url)
    } catch (error) {
      console.error('Error fetching book URL:', error);
    }
  };

  const fetchChapters = async (url) => {
    try {
      // Fetch the EPUB file
      const response = await fetch(url);
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

  useEffect(() => {
    if (chapters_list.length > 0) {
      fetchChapterContent(chapters_list[CurretnChapterNo].href);
    }
  }, [CurretnChapterNo, chapters_list]);

  const fetchChapterContent = async (chapterHref) => {
    try {
      const response = await fetch(bookUrl + chapterHref);
      const htmlContent = await response.text();
    } catch (error) {
      console.error('Error fetching chapter content:', error);
    }
  };

  function ChapterListing({ item, index }) {
    const [isLoading, setIsLoading] = useState(false)
    function replaceElement(arr, bookId, newElement) {
      function findBookIndexById(books, id) {
        for (let i = 0; i < books.length; i++) {
          if (books[i].id === id) {
            return i; // Если нашли книгу с заданным ID, возвращаем её индекс
          }
        }
        // Если книга с заданным ID не найдена, возвращаем -1
        return -1;
      }
      const index = findBookIndexById(arr, bookId)

      if (index < 0 || index >= arr.length) {
        return arr;
      }

      let newArr = [...arr];
      newArr[index] = newElement;

      return newArr;
    }



    const handleBuyChapter = async () => {
      try {

        setIsLoading(true)
        const user = await UserInfo();

        if (user.points < 50) {
          toast.info('Not enough points to buy chapter');
          setIsLoading(false)
          return;
        }

        const db = getFirestore();

        // Reference to the user document
        const userRef = doc(db, 'users', user.uid);

        // Check if the user document exists
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          throw new Error('User document does not exist');
        }

        // Update the points attribute in the user document
        console.log(user)
        if (user) {
          if (user?.books && user?.books?.some(item => item.bookId === book.id)) {
            const userBook = user.books.find(item => item.bookId === book.id)
            if (userBook.chapters.includes(index)) {
              toast.info('You already have this chapter');
              setIsLoading(false)
              return;
            }
            else {
              let userBook = user.books.find(item => item.bookId === book.id)
              userBook.chapters.push(index)
              const newBooks = replaceElement(user.books, book.id, userBook)
              await updateDoc(userRef, {
                points: user.points - 50,
                books: newBooks
              });

            }
          } else {
            await updateDoc(userRef, {
              points: user.points - 50,
              books: user?.books ? [...user.books, {
                bookId: book.id,
                chapters: [index],
              }] : [{
                bookId: book.id,
                chapters: [index],
              }]
            });
          }
        }

        toast.info('Chapter bought successfully!');
        const newUser = await UserInfo();
        setUser(newUser)
        setIsLoading(false)
      } catch (error) {
        console.error('Error buying chapter:', error);
        toast.info('An error occurred while buying chapter');
        setIsLoading(false)
      }
    };

    const submit = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h3>{`Confirm to buy chapter ${index + 1}`}</h3>
              <div style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    onClose();
                    handleBuyChapter()
                  }}
                  disabled={isLoading}
                >
                  Buy
                </button>
              </div>
            </div>
          )
        }
      });
    };

    return (
      <div key={index} style={{ display: "inline-block", marginRight: "15px", marginBottom: "20px" }}>
        {index < 3 || (user?.books && user.books.some(item => item.bookId === book.id) && user.books.find(item => item.bookId === book.id)?.chapters.includes(index)) ? (
          <a
            onClick={() => SetCurrentChapterNo(index)}
            style={{ backgroundColor: index === CurretnChapterNo ? "#B50E2C" : "#b7b7b7", color: index === CurretnChapterNo ? "white" : "black" }}>Ch {index + 1}</a>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={submit}>
            <a >Ch {index + 1}</a>
            <i className="fa fa-lock" style={{ marginLeft: "5px", color: "#B50E2C" }} />
          </div>
        )}
      </div>
    )
  }

  function BookDetails() {
    const desc = String.raw({ raw: book.summary }).replaceAll("\\n", '<br>')
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
                  <i className="fa fa-star-half-empty" />
                </div>
                <span>{book.rating}</span>
              </div>
              <p style={{ color: "#000", whiteSpace: 'pre-wrap' }}>{(parse(desc))}</p>
              <div className="anime__details__widget">
              </div>
              <div className="anime__details__btn">
                <a className="follow-btn"><i className="fa fa-heart-o" /> Favourite</a>
                <a onClick={() => setReadBook(true)} className="watch-btn"><span>Read Now</span> <i className="fa fa-angle-right" /></a>
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
        {
          readBook === false &&
          <div className="breadcrumb-option">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb__links">
                    <a href="/"><i className="fa fa-home" /> Home</a>
                    <a href="">Book Info</a>
                    {/* <span>Romance</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {
          loading === true || book === null ?
            (
              <div class="d-flex justify-content-center">
                <div class="spinner-border m-5 " role="status">
                  <span class="visually-hidden"></span>
                </div>
              </div>
            ) : (
              <section className="anime-details spad" style={{backgroundColor:readBook === true ? '#f4f6f8' : 'white', paddingTop: 100}}>
                <div className="container" style={{backgroundColor: 'white'}} >
                  {readBook === true ?
                    <BookRender GeneratedUrl={bookUrl} CurretnChapterNo={CurretnChapterNo} chapterList={chapters_list} BannerUri ={bannerUri} Author={book.author}  Title={book.title}/>
                    :
                    <BookDetails />
                  }
                  <div className="anime__details__episodes">
                    {chapters_list.map((item, index) => (
                      <ChapterListing key={index} item={item} index={index} />
                    ))}
                  </div>
                  {/* <div dangerouslySetInnerHTML={{ __html: chapters_list.href }} /> */}
                </div>
              </section>
            )
        }

      </div>


    </div>
  )
}

export default ItemInfo



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


