const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const port = process.env.PORT || 3000
require('dotenv').config()

// Create an express app
const app = express();
const pusher = new Pusher({
    appId : process.env.PUSHER_APP_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : process.env.PUSHER_CLUSTER,
    useTLS : true
})

// Use the cors middleware
app.use(cors());
app.use(express.json())

// Define a route
app.get('/api/send-room/:box/:block', (req, res) => {
    const {box, block} = req.params

    pusher.trigger('me-channel', 'me-event', {
        box,
        block
    })

    return res.send({box, block})
});

app.get('/ping', (req, res) => {
    return res.send('pong')
}) 

// Start the server
app.listen(port, () => {
  console.log('Server started on http://localhost:3000');
});

module.exports = app;