var express = require('express');
var fs = require('fs');
const date = require('date-and-time');

// Initializing the express and port number
var app = express();
var PORT = 8080;

function getData(tickerName, startDate, endDate) {
    var obj = JSON.parse(fs.readFileSync('data/' + tickerName + '.json', 'utf8'));

    console.log(JSON.stringify(obj));
    const result = obj.filter(x =>  (x.date >= startDate) && (x.date <= endDate)); 
    return result;
}

// Getting the request query string
app.get('/api', function(req, res){
   console.log('name: ' + req.query.ticker);
   const ticker = req.query.ticker;
   const startDate = req.query.start_date;
   var endDate = req.query.end_date;
   if (!endDate) {
    endDate = date.format(new Date(), "YYYY-MM-DD");
   }
   var response = 'name: ' + req.query.ticker + '\r\n' + 
   'start date: ' + req.query.start_date + '\r\n' +
   'end date: ' + req.query.end_date + '\r\n'; 
   const dataPart = getData(ticker, startDate, endDate);

   res.send(JSON.stringify(dataPart));

});

// Listening to the port
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});