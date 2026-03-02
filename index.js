const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get('/about', (req, res) => {
  res.send('This is the About page!');
});
app.get('/hello', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});
let items = [];
app.get('/items', (req, res) => {
  res.json(items);
});


app.post('/submit', (req, res) => {
  const username = req.body.username || 'Guest';
  res.send(`POST received! Hello, ${username}`);
});


app.post('/add-item', (req, res) => {
  const newItem = req.body.item;
  if (!newItem) {
    return res.status(400).json({ error: 'Item is required' });
  }
  items.push(newItem);

  res.json({ message: 'Item added', items });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.use((req, res) => {
  res.status(404).send('Page not found');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
