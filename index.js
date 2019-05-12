require('dotenv').config()
const express = require("express");
const app = express();
const Twitter = require("twitter");
const path = require('path')
const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


app.post("/get_details", (req, res) => {
  client.get(
    "users/show.json",
    { screen_name: req.body.username },
    (error, tweets, response) => {
      res.send(JSON.stringify(tweets, undefined, 2));
    }
  );
});

app.post("/get_tweets", (req, res) => {
  client.get(
    "statuses/user_timeline",
    { screen_name: req.body.username },
    (error, tweets, response) => {
      if (!error) {
        res.send(JSON.stringify(tweets, undefined, 2));
      }
    }
  );
});

app.post("/get_friends", (req, res) => {
  client.get(
    "friends/list.json",
    { screen_name: req.body.username },
    (error, tweets, response) => {
      if (!error) {
        res.send(JSON.stringify(tweets, undefined, 2));
      }
    }
  );
});

app.post("/search", (req, res) => {
  client.get(
    "search/tweets",
    { q: req.body.query },
    (error, tweets, response) => {
      if (!error) {
        res.send(JSON.stringify(tweets, undefined, 2));
      }
    }
  );
});

app.post("/get_trending", (req, res) => {
  client.get(
    "trends/place.json",
    { id: 20070458 },
    (error, tweets, response) => {
      res.send(JSON.stringify(tweets, undefined, 2));
    }
  );
});

app.listen(port, () => {
  console.log("Server started at http://localhost:5000");
});
