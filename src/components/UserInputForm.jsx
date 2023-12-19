import { useState } from 'react';
import './userInputForm.css';
import booklogo from '../icon/bookCover.jpg'

const UserInputForm = () => {
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [preferredPlot, setPreferredPlot] = useState('');
  const [similarDocuments, setSimilarDocuments] = useState([]);
  const [openBooks, setOpenBooks] = useState([]);

  const handleBookClick = (index) => {
    setOpenBooks((prevOpenBooks) => {
      const newOpenBooks = [...prevOpenBooks];
      newOpenBooks[index] = !newOpenBooks[index];
      return newOpenBooks;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      favoriteBooks: favoriteBooks,
      preferredPlot: preferredPlot,
    };

    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully');
        console.log(data.setSimilarDocuments)
        setSimilarDocuments(data.similarDocuments);
        setFavoriteBooks('');
        setPreferredPlot('');
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error.message);
    }
  };
  return (
    <div className='mainPage'>
     <div className="user-input-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="favoriteBooks">Write 5 Words that describe you best.</label>
          <textarea
            id="favoriteBooks"
            value={favoriteBooks}
            onChange={(e) => setFavoriteBooks(e.target.value)}
            placeholder="What describe you best..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preferredPlot">Write what kind of story or plot you are looking for in the book (within 200 words):</label>
          <textarea
            id="preferredPlot"
            value={preferredPlot}
            onChange={(e) => setPreferredPlot(e.target.value)}
            placeholder="Enter preferred plot..."
            required
            maxLength={200}
          />
        </div>
        <button type="submit">Submit</button>
       </form>
     </div>
    <div className="results">
        <h1 className="resultsHeading">Top Recommendations</h1>
        <ul className="bookList">
          {similarDocuments.map((document, index) => (
            <li key={index} className={`book ${openBooks[index] ? 'is-open' : ''}`} onClick={() => handleBookClick(index)}>
              <div className="book-cover">
                <img className="bookLogo" src={document.coverImgURL} alt={booklogo} />
              </div>
              <div className="book-content">
              <h3 className='bookTitle'>{document.original_title}</h3>
              <p className='byText'>By</p>
                <h4 className='bookAuthor'>{document.authors}</h4>
                <p>{document.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default UserInputForm;
