import { Router } from "express";
import { login } from "~/controllers/auth/loginController";
import { register } from "~/controllers/auth/registerController";
import { checkJWT } from "~/middlewares/checkJWT";
import { userValidation } from "~/validations/userValidate";
import {logout} from "~/controllers/auth/logOut"
import { oauthGoogle } from "~/controllers/auth/oauthGoogle";
const router = Router();

router.post("/register", userValidation.validateUser, register);
router.post("/login", userValidation.validateUser, login);
router.post("/logOut", checkJWT, logout );
router.get("/oauth-google", oauthGoogle)


export default router;
