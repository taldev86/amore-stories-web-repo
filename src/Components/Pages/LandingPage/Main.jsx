import React, { useEffect } from 'react'
import HeroSection from './Hero/HeroSection'
import ProductSection from './Products/ProductSection'
import ProductByCat from './Products/ProductByCat'
import CatData from '../../GlobalData/CatData'
import CustomHeroSection from '../../../CustomHeroSection/CustomHeroSection'
import PayStripe from '../../StripeComponents/PayStripe'
import Epub from 'epubjs';

const Main = () => {



  return (

    <div>
      <CustomHeroSection />

      {
        CatData.map((item, index) => {
          return (
            <ProductByCat
              title={item.name}
              CatId={item.CatId}
            />
          )
        })
      }


    </div>
  )
}

export default Main



// const fetchChapterText = async (url, href) => {
//   try {
//     console.log("running try")

//     // Fetch the EPUB file
//     const response = await fetch(url);
//     const epubArrayBuffer = await response.arrayBuffer();

//     // Initialize the EPUB reader
//     const book = Epub(epubArrayBuffer);

//     // Wait for the book to be ready
//     await book.ready;
//     // console.log('Book is ready:', book.ready);
//     // Load the book content
//     await book.load();
//     // Load the book content
//     await book.load();
//     console.log('Book is loaded:', book.loaded);
//     // Get the content of the chapter by href

//     const chapter = book.spine.get(href);
//     // Access the document content of the chapter
//     const chapterDocument = chapter.document;

//     // Extract the text content from the document
//     // const chapterText = chapterDocument.body.textContent;
//     // // Get the text content of the chapter
//     // const chapterText = await chapter.text();

//     // // return chapterText;

//     console.log('Contnet ->', chapterDocument);
//   } catch (error) {
//     console.error('Error fetching chapter text:', error);
//     return null;
//   }
// };

// // Usage example
// const chapterHref = 'section-0001.xhtml'; // Replace with the href of the first chapter
// const bookURl = "https://firebasestorage.googleapis.com/v0/b/amore-stories.appspot.com/o/books%2FOwned%20by%20the%20Alpha%20Kings%2FOwned%20by%20the%20Alpha%20Kings%20-Edited_Epub.epub?alt=media&token=d0823304-7adc-4625-91c2-ab7959dd17f5"

