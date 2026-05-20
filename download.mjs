import https from 'https';
import fs from 'fs';

const images = [
  { name: 'france.jpg', url: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'egypt.jpg', url: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'japan.jpg', url: 'https://images.pexels.com/photos/161401/mount-fuji-japan-mountain-shizuoka-161401.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'india.jpg', url: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'brazil.jpg', url: 'https://images.pexels.com/photos/2816732/pexels-photo-2816732.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'australia.jpg', url: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'china.jpg', url: 'https://images.pexels.com/photos/1423580/pexels-photo-1423580.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'usa.jpg', url: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=640' }
];

images.forEach(img => {
  const file = fs.createWriteStream(`public/${img.name}`);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };
  https.get(img.url, options, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
       https.get(response.headers.location, options, (res2) => res2.pipe(file));
    } else {
       response.pipe(file);
    }
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${img.name}`);
    });
  }).on('error', (err) => {
    fs.unlink(`public/${img.name}`);
    console.error(`Error downloading ${img.name}: ${err.message}`);
  });
});
