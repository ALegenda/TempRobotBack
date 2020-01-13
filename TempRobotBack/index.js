const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();
app.use(express.json());
app.set('port', (process.env.PORT || 3000));
const url = "mongodb://dbadmin:Vl240651@ds361968.mlab.com:61968/heroku_90wdqz4n";

mongoose.connect(url);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Measurement = new Schema({
                            date       : {type: Date, default: Date.now},
                            temperature: Number,
                            humidity   : Number,
                            battery    : Number
                        });

const MeasurementModel = mongoose.model('Measurement', Measurement);

app.get('/', (req, res) =>
{
    MeasurementModel.find({}, (err, docs) =>
    {
        res.send(docs);
    });
});

app.post('/', (req, res) =>
{
    const body = req.body;
    const instance = new MeasurementModel();
    instance.date = new Date(body.date*1000);
    instance.temperature = body.temperature;
    instance.humidity = body.humidity;
    instance.battery = body.battery;

    instance.save().then(obj=>{
       res.send(obj);
    });
});


app.listen(
    app.get('port'),
    () =>
    {
        console.log('Node app is running on port', app.get('port'));
    }
);
