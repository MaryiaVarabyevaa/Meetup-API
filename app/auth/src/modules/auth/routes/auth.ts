import express from "express";
import authController from "../auth.controller";
import { passportMiddleware, validateMiddleware, authenticateMiddleware } from "../middlewares";
import { validatePayload, validateLogin, validateRegistration } from "../validators";

const router = express.Router();

router.post(
  '/registration',
  validateMiddleware(validateRegistration),
  authController.signup
);
router.post(
  '/login',
  validateMiddleware(validateLogin),
  authController.login
);
router.get(
  '/refresh',
  authController.refresh
);
router.get(
  '/google',
  passportMiddleware('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passportMiddleware('google', { session: false }),
  authController.authenticateWithGoogle
);
router.get(
  '/profile',
  authenticateMiddleware,
  validateMiddleware(validatePayload),
  authController.showUserData
);
router.get(
  '/logout',
  authController.logout
)

export { router };
