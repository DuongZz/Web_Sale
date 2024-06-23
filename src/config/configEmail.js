import nodemailer from "nodemailer";
import { env } from "./environment";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: env.HOST_MAIL,
  port: 465,
  secure: true,
  auth: {
    user: env.SENDER_EMAIL,
    pass: env.PASS_APP,
  },
});
