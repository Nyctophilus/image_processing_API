import express from 'express';
import imgProcessing from '../../img-processing/imgProcessing';
import fs from 'fs';

const imgRouter = express.Router();

const imgFunc = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  // process.cwd() is the path to the parent folder
  const filePath: string = `${process.cwd()}/dist/images/`;

  // destructuring the qurey params
  const fn: string = req.query.filename as unknown as string;
  const width: string = req.query.w as unknown as string;
  const height: string = req.query.h as unknown as string;

  //   console.log(
  //     `FileName:${nameParams} , width:${width} , height:${height}`
  //   );

  try {
    //FIXDONE - check if the image exists
    fs.access(`${filePath}${fn}.jpg`, fs.constants.F_OK, (err) => {
      //err ? 'does not exist' : 'exists'
      if (err) {
        res
          .status(404)
          .send(`Image named '${fn}' not found on your directory!`);
      }
    });

    // FIXDONE checking the repeated requests
    // the check for repeated requests, when false 'params not repeated' will process the image. Otherwise the image will be served from the cache
    // has to be sync version!!
    if (!fs.existsSync(`${filePath}${width}x${height}_${fn}.jpg`)) {
      // wait until the image resized
      await imgProcessing.imgProcess(fn, width, height);
    }

    // console.log(`new|repeated, will use the cached img`);
    // send the edited image as a server response
    res.sendFile(`${imgProcessing.imgPath}${width}x${height}_${fn}.jpg`);
  } catch (error) {
    console.log(error);
  }
};

imgRouter.get('/image', imgFunc);

export default imgRouter;
