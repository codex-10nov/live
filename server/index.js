import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import SocketService from './services/socket.js';
import reviews from './api/index.js';

const app = express();
const socketService = new SocketService();

socketService.initListeners();

app.use(bodyParser.json());
app.use("/", reviews);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

mongoose.connect("mongodb://localhost:27017/reviews", {});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});