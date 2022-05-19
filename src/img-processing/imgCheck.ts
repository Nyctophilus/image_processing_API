import sharp from "sharp";

const imgCheck = async (
  filename: any,
  width: any,
  height: any
) => {
  const filePath: string =
    "D:/FrontendPath/fwd/Advanced NanoDegree/image_processing_API/dist/images/";

  try {
    const data = await sharp(
      `${filePath}${width}x${height}_${filename}.jpg`
    ).metadata();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default imgCheck;
