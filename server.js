// server.js



    require('dotenv').config({ path: 'variables.env' });
    const express = require('express');
    const cors = require('cors');

    const poll = [
      {
        name: 'Difficult to Collabrate with other teachers',
        votes: 100,
      },
      {
        name: 'Limited Prepartion Time',
        votes: 70,
      },
      {
        name: 'Hard to Find Resources',
        votes: 250,
      },
      {
        name: 'Safety Issues',
        votes: 689,
      },
      {
        name: 'Classroom Management Problems',
        votes: 150,
      },
      {
        name: 'Lack of Teaching Strategies',
        votes: 150,
      },
      {
        name: 'No Room to exhibit Students Projects'',
        votes: 150,
      },
      {
        name: 'Limited Storage Spaces',
        votes: 150,
      },
      {
        name: 'Hard to Assess Learning Outcomes',
        votes: 150,
      },
    ];

    const app = express();
    app.use(cors());

    app.get('/poll', (req, res) => {
      res.json(poll);
    });

    app.set('port', process.env.PORT || 4000);
    const server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });
    const Pusher = require('pusher');

        const pusher = new Pusher({
          appId: process.env.PUSHER_APP_ID,
          key: process.env.PUSHER_APP_KEY,
          secret: process.env.PUSHER_APP_SECRET,
          cluster: process.env.PUSHER_APP_CLUSTER,
          encrypted: true,
        });

        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }

        function increment() {
          const num = getRandomNumber(0, poll.length);
          poll[num].votes += 20;
        }

        function updatePoll() {
          setInterval(() => {
            increment();
            pusher.trigger('poll-channel', 'update-poll', {
              poll,
            });
          }, 1000);
        }
