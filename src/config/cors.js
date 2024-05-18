import { env } from "./environment";

export const corsConfig = {
    origin: [env.REACT_GEARVN_CLONE_HOST, env.REACT_GEARVN_ADMIN_HOST],
    credentials: true
} 