import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [storeName, setStoreName] = useState('');
  const [rating, setRating] = useState('');
  const [ratingsList, setRatingsList] = useState([]);

  const submitRating = async () => {
    if (!storeName || !rating) return alert("Fill all fields");
    await axios.post('http://localhost:5000/rate', { storeName, rating });
    setStoreName('');
    setRating('');
    fetchRatings();
  };

  const fetchRatings = async () => {
    const res = await axios.get('http://localhost:5000/ratings');
    setRatingsList(res.data);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Store Ratings App</h1>
      <input placeholder="Store Name" value={storeName} onChange={e => setStoreName(e.target.value)} />
      <input type="number" placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)} />
      <button onClick={submitRating}>Submit</button>

      <h2>Average Ratings</h2>
      <ul>
        {ratingsList.map((store, index) => (
          <li key={index}>{store.store_name}: {store.average_rating.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
