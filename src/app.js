import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";
import morgan from "morgan";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { corsConfig } from "./config/cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketConfig } from "./config/socket";
import { onConnect } from "./socket";

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandlingMiddleware);

if (process.env.BUILD_MODE === "dev") app.use(morgan("dev"));
app.use("/api", router);

const server = createServer(app);
export const io = new Server(server, socketConfig);

io.on("connection", onConnect);

export default server;
