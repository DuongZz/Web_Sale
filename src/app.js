import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";
import morgan from "morgan";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { env } from "./config/environment";

const app = express();

app.use(cors(
  {
    origin: [env.REACT_GEARVN_CLONE_HOST,],
    credentials: true
  }
))

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandlingMiddleware)

if(process.env.BUILD_MODE === 'dev') app.use(morgan('dev'))
app.use('/api', router)


export default app;
