'use strict';

const Twitter = require('twit');
const express = require("express");
const app = express();

const client = new Twitter({
    consumer_key: 'ywEk0aKEE7mKVRK66Xv3ccIPK',
    consumer_secret: 'vzmboW3snGPdiq14bkckoMk2iLs1NxOsefbi4NOSuNSL51IdKt',
    access_token: '56795035-LXdeh944h5WoCBZ5cjHHcM2jwt9xURpM8Nv3iClQr',
    access_token_secret: 'CQ8zglJBFbnLd7VzZQxm7fPLpGA9tr1nITgDfIlfalbDM'
});

let tweets = [];

app.use(require("cors")());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());

app.post("/search", (req, res) => {
    tweets = [];
    client.get('search/tweets', { q: req.body.term, count: 100 }, (err, data, response) => {
        let statuses = data.statuses;
        statuses.forEach(status => {
            tweets.push({
                id: status.id_str,
                user: {
                    name: status.user.name,
                    username: status.user.screen_name,
                    image: status.user.profile_image_url
                },
                text: status.text,
                date: status.created_at,
                url: "https://www.twitter.com/web/status/" + status.id_str
            })
        });
        res.send(tweets);
    })
});

app.listen(3000, () => console.log("Server running"));
