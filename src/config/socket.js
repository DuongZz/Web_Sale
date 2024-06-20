import { env } from "./environment";

export const socketConfig = {
  cors: {
    origin: [env.REACT_GEARVN_ADMIN_HOST, env.REACT_GEARVN_CLONE_HOST],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
};
