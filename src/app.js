import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);

export default app;
