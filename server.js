// server.js
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for serving HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});