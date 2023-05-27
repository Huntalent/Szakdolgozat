const http = require('http');

//Az útvonal amin keresztül meghívódnak az árfolyam adatok
const options = {
  hostname: 'https://eodhistoricaldata.com',
  path: '/api/eod/#TICKER#.US?api_token=6463a0c1270f15.56612173&order=a&fmt=json&from=#FROM#&to=#TO#',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

//Útvonal megadása
const getData = (ticker, from, to) => {
  let data = '';
  options.path = options.path.replace('#FROM#', from);
  const request = http.request(options, (response) => {
    return 'response';
  });

  // Kijelzi ha hibát talál
  request.on('error', (error) => {
    console.error(error);
  });

  request.end();
};

//Szerver lértehozása
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.write(getData());
  res.end();
}).listen(8080);