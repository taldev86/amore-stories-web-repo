import React from 'react'

const BookPages = () => {
  return (
    <div>
      <div>
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <a href="./index.html"><i className="fa fa-home" /> Home</a>
                  <a href="./categories.html">Categories</a>
                  <a href="#">Romance</a>
                  <span>Fate Stay Night: Unlimited Blade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="anime-details spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="anime__video__player">
                  <video id="player" playsInline controls data-poster="../../Assets/img/trending/trend-4.jpg">
                    <source src="videos/1.mp4" type="video/mp4" />
                    {/* Captions are optional */}
                    <track kind="captions" label="English captions" src="#" srcLang="en" default />
                  </video>
                </div>
                <div className="anime__details__episodes">
                  <div className="section-title">
                    <h5>Chapters</h5>
                  </div>
                  <a href="#">Ch 01</a>
                  <a href="#">Ch 02</a>
                  <a href="#">Ch 03</a>
                  <a href="#">Ch 04</a>
                  <a href="#">Ch 05</a>
                  <a href="#">Ch 06</a>
                  <a href="#">Ch 07</a>
                  <a href="#">Ch 08</a>
                  <a href="#">Ch 09</a>
                  <a href="#">Ch 10</a>
                  <a href="#">Ch 11</a>
                  <a href="#">Ch 12</a>
                  <a href="#">Ch 13</a>
                  <a href="#">Ch 14</a>
                  <a href="#">Ch 15</a>
                  <a href="#">Ch 16</a>
                  <a href="#">Ch 17</a>
                  <a href="#">Ch 18</a>
                  <a href="#">Ch 19</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
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
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default BookPages