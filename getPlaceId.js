const https = require('https');

const data = JSON.stringify({
  textQuery: "AnviGleams Skin Studio Sangamner"
});

const options = {
  hostname: 'places.googleapis.com',
  path: '/v1/places:searchText',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyDOQ9AVHLs7nvJlPiqGRYir1XvEEs1mpCc',
    'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount',
    'Referer': 'https://anvigleams.in',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(body));
});

req.on('error', err => console.log('Error:', err.message));
req.write(data);
req.end();
