import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader'; // Use useWindowSize hook
import './BookRenderStyle.scss';

const BookRender = ({ GeneratedUrl, CurretnChapterNo, chapterList, BannerUri, Author, Title }) => {
  const [location, setLocation] = useState(0);
  const width = "100%"
  const height = "100%"

  useEffect(()=>{
    if(chapterList[CurretnChapterNo].href) {
      setLocation(chapterList[CurretnChapterNo].href)
    }
  },[CurretnChapterNo])

  return (   
    <div className='wrap-book-reader' style={{ height: height }}>  
      <div className='info-book'>
        <div className='image-book' >
          <img src={BannerUri} alt='' />
        </div>
        <div className="title-book">
          {Title}
        </div>
        <div className="author">
          Author: {Author}
        </div>
      </div>
      <div className='line'></div>
      <ReactReader
        url={GeneratedUrl}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        showToc={false}
        stylesheet={'http://localhost:3000/style'}
        epubOptions={{
          flow: 'scrolled',
          minSpreadWidth:22,
          // preventTextSelection: true,
          height: height,
        }}
        getRendition={(rendition) => {
          rendition.themes.fontSize('20px')
          rendition.themes.font('Vollkorn,serif')
          rendition.themes.override('color', '#3a4a5a')
          rendition.themes.override('min-height', '20px')
          rendition.themes.override('line-height', '33px')
        }}
        readerStyles={{}}
        swipeable={false}
        height={height}
        width={width} 
      />
    </div>
  );
};

export default BookRender;



// import React, { useState, useEffect } from 'react';
// import { getDownloadURL, ref, getStorage } from 'firebase/storage';
// import { ReactReader } from 'react-reader'

// const BookRender = () => {
  

//     const [location, setLocation] = useState(2)

//     return (
//         <div style={{ height: '100vh' }}>
//         <ReactReader
//           url="https://react-reader.metabits.no/files/alice.epub"
//           location={location}
//           locationChanged={(epubcfi) => setLocation(epubcfi)}
//         />
//       </div>
//     );
// };

// export default BookRender;

    // useEffect(() => {
    //     const fetchChapters = async () => {
    //         try {
    //             // Fetch the EPUB file
    //             const response = await fetch('https://react-reader.metabits.no/files/alice.epub');
    //             const epubArrayBuffer = await response.arrayBuffer();
    
    //             // Initialize the EPUB reader
    //             const book = Epub(epubArrayBuffer);
    
    //             // Wait for the book to be ready

    //             console.log("book",book)
    //             await book.ready;
    
    //             // Extract chapters
    //             const chapters = book.navigation.toc.map(item => ({
    //                 title: item.label,
    //                 href: item.href
    //             }));
    
    //             console.log("chapter",chapters);
    //         } catch (error) {
    //             console.error('Error fetching/reading EPUB file:', error);
    //         }
    //     };
    
    //     fetchChapters();
    // }, []);
    
