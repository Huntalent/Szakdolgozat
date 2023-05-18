var http = require('http');

const options = {
  hostname: 'https://eodhistoricaldata.com',
  path: '/api/eod/#TICKER#.US?api_token=6463a0c1270f15.56612173&order=a&fmt=json&from=#FROM#&to=#TO#', // we changed the path to only grab one post
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getData = (ticker, from, to) => {
  let data = '';
  options.path = options.path.replace('#FROM#', from);
  const request = http.request(options, (response) => {
    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    return 'response';
    response.setEncoding('utf8');

    // As data starts streaming in, add each chunk to "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      console.log(data);
      return data;
    });
  });

  // Log errors if any occur
  request.on('error', (error) => {
    console.error(error);
  });

  // End the request
  request.end();
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  req.
  res.write(getData());
  res.end();
}).listen(8080);