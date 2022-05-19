import sharp from "sharp";
import fs from "fs";

const imgPath: string =
  "D:/FrontendPath/fwd/Advanced NanoDegree/image_processing_API/dist/images/";

const imgProcess = async (
  filename: any,
  width: any,
  height: any
) => {
  try {
    const img = await sharp(`${imgPath}${filename}.jpg`)
      .resize(parseInt(width), parseInt(height))
      .jpeg()
      .toBuffer();

    fs.writeFileSync(
      `${imgPath}${width}x${height}_${filename}.jpg`,
      img
    );
  } catch (error) {
    console.log(error);
  }
};

export default { imgProcess, imgPath };
