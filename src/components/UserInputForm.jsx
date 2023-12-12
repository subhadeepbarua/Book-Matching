import { useState } from 'react';
import './userInputForm.css';


const UserInputForm = () => {
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [preferredPlot, setPreferredPlot] = useState('');
  const [similarDocuments, setSimilarDocuments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      favoriteBooks: favoriteBooks,
      preferredPlot: preferredPlot,
    };

    try {
      const response = await fetch('https://booknode.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully');
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
    <div>
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
     <div className='results'>
        <h1 className='resultsHeading'>Top Recommendations</h1>
        <ul className='bookList'>
          {similarDocuments.map((document, index) => (
            <li key={index} className='listItem'>
              <h3>{document.original_title}</h3>
              <p>Author: {document.authors}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInputForm;
