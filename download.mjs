import https from 'https';
import fs from 'fs';

const images = [
  { name: 'france.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Eiffel_tower_from_trocadero.jpg/640px-Eiffel_tower_from_trocadero.jpg' },
  { name: 'egypt.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/640px-All_Gizah_Pyramids.jpg' },
  { name: 'japan.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/080103_hakkoda16.jpg/640px-080103_hakkoda16.jpg' },
  { name: 'india.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/640px-Taj_Mahal_%28Edited%29.jpeg' },
  { name: 'brazil.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg/640px-Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg' },
  { name: 'australia.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/640px-Sydney_Opera_House_Sails.jpg' },
  { name: 'china.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/640px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg' },
  { name: 'usa.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/640px-Statue_of_Liberty_7.jpg' }
];

images.forEach(img => {
  const file = fs.createWriteStream(`public/${img.name}`);
  https.get(img.url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${img.name}`);
    });
  }).on('error', (err) => {
    fs.unlink(`public/${img.name}`);
    console.error(`Error downloading ${img.name}: ${err.message}`);
  });
});
