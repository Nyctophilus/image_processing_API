import express from "express";
import imgProcessing from "../../img-processing/imgProcessing";
import imgCheck from "../../img-processing/imgCheck";

const imgRouter = express.Router();

const imgFunc = async (
  req: express.Request,
  res: express.Response
) => {
  // destructuring the params
  const { filename: fn, w: width, h: height } = req.query;

  //   console.log(
  //     `FileName:${fn} , width:${width} , height:${height}`
  //   );

  try {
    // wait until the image resized
    await imgProcessing.imgProcess(fn, width, height);

    // send the edited image as a server response
    res.sendFile(
      `${imgProcessing.imgPath}${width}x${height}_${fn}.jpg`
    );
  } catch (error) {
    console.log(error);
  }

  // FIXME checking the repeated requests
  imgCheck(fn, width, height);
};

imgRouter.get("/image", imgFunc);

export default imgRouter;
