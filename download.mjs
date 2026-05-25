import https from 'https';
import fs from 'fs';

const images = [
  { name: 'france.jpg', url: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'egypt.jpg', url: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'japan.jpg', url: 'https://images.pexels.com/photos/1105342/pexels-photo-1105342.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'india.jpg', url: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'brazil.jpg', url: 'https://images.pexels.com/photos/2816732/pexels-photo-2816732.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'australia.jpg', url: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'china.jpg', url: 'https://images.pexels.com/photos/1423580/pexels-photo-1423580.jpeg?auto=compress&cs=tinysrgb&w=640' },
  { name: 'usa.jpg', url: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=640' }
];

const download = (url, path) => {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, path).then(resolve);
      } else {
        const file = fs.createWriteStream(path);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded: ' + path);
          resolve();
        });
      }
    });
  });
};

async function run() {
  for (const img of images) {
    await download(img.url, `public/${img.name}`);
  }
}

run();
