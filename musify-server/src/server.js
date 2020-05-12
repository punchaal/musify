require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const connectDB = require('../config/db');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { PORT } = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

//Connect Database
connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

// Socket IO

io.on('connection', (socket) => {
  console.log('We have a new connection');

  socket.on('sendMessage', async (message) => {
    console.log(message);
    let sender = message.sender.user;
    let receiver = message.receiver.user;

    let sendUser = message.sender;
    let comment = message.comment;

    try {
      let conversation = await Conversation.findOne({
        'members.user': sender,
        'members.user': receiver,
      });

      console.log(conversation._id);

      let message = new Message({
        sender: sender,
        comment: comment,
        conversationId: { _id: conversation._id },
      });

      console.log(message);

      message.save((err, doc) => {
        if (err) console.log(err);

        Message.find({ _id: doc._id })
          .populate('sender')
          .exec((err, doc) => {
            return io.emit('Output', doc);
          });
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnet', () => {
    conosle.log('User has left');
  });
});

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/profile', require('../routes/api/profile'));
app.use('/api/posts', require('../routes/api/posts'));
app.use('/api/spotify-login', require('../routes/api/spotify-login'));
app.use('/api/forgotpass', require('../routes/api/forgotpassword'));
app.use('/api/reset', require('../routes/api/reset-password'));
app.use('/api/updatepass', require('../routes/api/updatePassword'));
app.use('/api/upload-pic', require('../routes/api/upload-pic'));
app.use('/api/search-tracks', require('../routes/api/search-tracks'));
app.use('/api/comments', require('../routes/api/comments'));
app.use('/api/conversations', require('../routes/api/conversations'));
app.use('/api/messages', require('../routes/api/messages'));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
