const express = require('express');
const fs = require('fs');
const date = require('date-and-time');

// Inicalizálja az expresst és megadja a port címét
const app = express();
const PORT = 8080;

//Mivel a szerver és a kliens nem egy url címen fut ezért globálisan össze kell őket hangolni
var cors = require('cors')
app.use(cors({
   origin: '*'
}));

//Front end-ről megkapott adatok alapján kiválasztja a kezdeti és záró dátumon belüli értékeket
function getData(tickerName, startDate, endDate) {
    let obj = JSON.parse(fs.readFileSync('data/' + tickerName + '.json', 'utf8'));

    console.log(JSON.stringify(obj));
    const result = obj.filter(x =>  (x.date >= startDate) && (x.date <= endDate)); 
    return result;
}

// Lekérdezi a megadott paraméterek szerinti adatokat
app.get('/api', function(req, res){
   console.log('name: ' + req.query.ticker);
   const ticker = req.query.ticker;
   const startDate = req.query.start_date;
   let endDate = req.query.end_date;
   if (!endDate) {
    endDate = date.format(new Date(), "YYYY-MM-DD");
   }
   let response = 'name: ' + req.query.ticker + '\r\n' + 
   'start date: ' + req.query.start_date + '\r\n' +
   'end date: ' + req.query.end_date + '\r\n'; 
   const dataPart = getData(ticker, startDate, endDate);

   res.send(JSON.stringify(dataPart));

});

// Ezen a porton lehet elérni a szervert
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});

