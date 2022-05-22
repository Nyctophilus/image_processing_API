import express from 'express';
import imgRouter from './api/images';

const router = express.Router();

// starter route with a hint to get started with the api
router.get(
  '/',
  (req: express.Request, res: express.Response): express.Response =>
    res.send(`hello server... 
for a quick test, you can navigate to /image?filename=imgName&w=1500&h=800`)
);

router.use(imgRouter);

export default router;
