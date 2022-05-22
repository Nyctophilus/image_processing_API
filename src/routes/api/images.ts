import express from 'express';
import imgProcessing from '../../img-processing/imgProcessing';
import fs from 'fs';
import path from 'path';

const imgRouter = express.Router();

const imgFunc = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  // __dirname is the path to the current folder
  const filePath: string = path.join(__dirname, '/../../../images/');

  // destructuring the qurey params
  const fn: string = req.query.filename as unknown as string;
  const width: string = req.query.w as unknown as string;
  const height: string = req.query.h as unknown as string;

  // FIXME error messages
  if (!fn || !width || !height) {
    let errMsg: string[] = [];

    if (!fn) errMsg.push('name');
    if (!width) errMsg.push('width');
    if (!height) errMsg.push('height');

    res.status(500).send(`You have to write an image ${errMsg.join(' & ')}!`);
  } else if (!/^[0-9]+$/g.test(width) || !/^[0-9]+$/g.test(height)) {
    let errMsg: string[] = [];

    // negative numbers
    if (parseInt(width) < 1 || parseInt(height) < 1) {
      if (parseInt(width) < 1) errMsg.push('width that exceeds zero!');
      if (parseInt(height) < 1) errMsg.push('height that exceeds zero!');
    }

    // string inputs
    else {
      if (!/^[0-9]+$/g.test(width)) errMsg.push('width');
      if (!/^[0-9]+$/g.test(height)) errMsg.push('height');
    }

    res
      .status(500)
      .send(`You have to write a proper numeric image ${errMsg.join(' & ')}!`);
  }

  // Enter image processing only if there's a filename & width,height are Numbers 1+
  else {
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
      if (!fs.existsSync(`${filePath}${width}x${height}_${fn}.jpg`)) {
        // wait until the image resized
        await imgProcessing.imgProcess(fn, width, height);
      }

      // console.log(`new|repeated, will use the cached img`);
      // send the edited image as a server response
      res.sendFile(`${filePath}${width}x${height}_${fn}.jpg`);
    } catch (error) {
      console.log(error);
    }
  }
};

imgRouter.get('/image', imgFunc);

export default imgRouter;
