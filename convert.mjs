import fs from 'fs';
import path from 'path';

const assetsDir = 'public';
const files = [
  'france.jpg', 'egypt.jpg', 'japan.jpg', 'india.jpg', 
  'brazil.jpg', 'australia.jpg', 'china.jpg', 'usa.jpg',
  'bg_scifi.png', 'bg_alien.png', 'bg_cartoon.png'
];

let output = 'export const ImageStore = {\n';

files.forEach(file => {
  try {
    const filePath = path.join(assetsDir, file);
    const data = fs.readFileSync(filePath);
    const ext = path.extname(file).substring(1);
    const base64 = data.toString('base64');
    const key = file.replace('.', '_');
    output += `  ${key}: "data:image/${ext};base64,${base64}",\n`;
  } catch (e) {
    console.error(`Missing ${file}`);
  }
});

output += '};\n';
fs.mkdirSync('src/assets', { recursive: true });
fs.writeFileSync('src/assets/ImageStore.js', output);
console.log('Generated ImageStore.js');
