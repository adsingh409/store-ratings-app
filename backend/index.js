const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/rate', (req, res) => {
  const { storeName, rating } = req.body;
  const sql = 'INSERT INTO ratings (store_name, rating) VALUES (?, ?)';
  connection.query(sql, [storeName, rating], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving rating');
    }
    res.send('Rating saved successfully');
  });
});

app.get('/ratings', (req, res) => {
  connection.query('SELECT store_name, AVG(rating) as average_rating FROM ratings GROUP BY store_name', (err, results) => {
    if (err) return res.status(500).send('Error fetching ratings');
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
