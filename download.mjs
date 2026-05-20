import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg', file: 'france.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg', file: 'egypt.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Fuji_sunrise.jpg/800px-Fuji_sunrise.jpg', file: 'japan.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg', file: 'india.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg/800px-Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg', file: 'brazil.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/800px-Sydney_Opera_House_Sails.jpg', file: 'australia.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg', file: 'china.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/800px-Statue_of_Liberty_7.jpg', file: 'usa.jpg' }
];

images.forEach(({url, file}) => {
  const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
    const dest = fs.createWriteStream(path.join('public', file));
    res.pipe(dest);
    dest.on('finish', () => console.log(`Downloaded ${file}`));
  });
  req.on('error', (e) => console.error(e));
});
