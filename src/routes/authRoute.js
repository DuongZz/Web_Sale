import { Router } from "express";
import { login } from "~/controllers/auth/loginController";
import { register } from "~/controllers/auth/registerController";
import { checkJWT } from "~/middlewares/checkJWT";
import { userValidation } from "~/validations/userValidate";
import {logout} from "~/controllers/auth/logOut"
import { oauthGoogle } from "~/controllers/auth/oauthGoogle";
import { googleLogin } from "~/controllers/auth/googleLogin";
const router = Router();

router.post("/register", userValidation.validateUser, register);
router.post("/login", userValidation.validateUser, login);
router.post("/logOut", checkJWT, logout );
router.get("/oauth-google", oauthGoogle)
router.post("/google-login", googleLogin);


export default router;
