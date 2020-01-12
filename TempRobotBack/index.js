var express = require('express');
const app = express();
app.use(express.json());
app.set('port', (process.env.PORT || 3000));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://dbadmin:Vl240651@ds361968.mlab.com:61968/heroku_90wdqz4n";
var db;

MongoClient.connect(url, (err, client) =>
{
    if (err) {
        throw err;
    }
    db = client.db('heroku_90wdqz4n').collection('data');

    db.find().toArray((err, result) =>
                                            {
                                                if (err) {
                                                    throw err;
                                                }
                                                console.log(result);
                                            });
});

app.get('/', (req, res) =>
{
    db.find().toArray((err, result) =>
                      {
                          if (err) {
                              throw err;
                          }
                          res.send(result);
                      });
});

app.post('/', (req, res) =>
{
    const body = req.body;
    console.log(body);
    db.insertOne({date:body.date,temperature:body.temperature,humidity:body.humidity,battery:body.battery}).then(result =>{
        res.send(result.insertedId);
    });
});

app.listen(
    app.get('port'),
    () =>
    {
        console.log('Node app is running on port', app.get('port'));
    }
);
