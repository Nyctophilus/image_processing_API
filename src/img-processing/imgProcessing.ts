import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgPath: string = path.join(__dirname, '/../../images/');

const imgProcess = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  try {
    // using sharp to resize jpg and adding to a buffer
    const img: Buffer = await sharp(`${imgPath}${filename}.jpg`)
      .resize(parseInt(width), parseInt(height))
      .jpeg()
      .toBuffer();

    // making the new image based on the request dimonsions
    fs.writeFileSync(`${imgPath}${width}x${height}_${filename}.jpg`, img);
  } catch (error) {
    console.log(error);
  }
};

export default { imgProcess, imgPath };
