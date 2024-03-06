import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader'; // Use useWindowSize hook

const BookRender = ({ GeneratedUrl, CurretnChapterNo, chapterList }) => {
  const [location, setLocation] = useState(0);
  const width = "100%"
  const height = "100%"


  useEffect(()=>{
    if(chapterList[CurretnChapterNo].href) {
      setLocation(chapterList[CurretnChapterNo].href)
    }
  },[CurretnChapterNo])

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
        url={GeneratedUrl}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        showToc={false}
        epubOptions={{
          flow: 'scrolled',
          minSpreadWidth:22,
          preventTextSelection: true
        }}
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
    
