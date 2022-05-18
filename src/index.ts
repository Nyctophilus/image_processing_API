import express from "express";
import mainRouter from "./routes";

const app = express();
const port: number = 3000;

app.listen(port, () =>
  console.log(`server is working at localhost:${port}`)
);

app.use(mainRouter);

export default app;
