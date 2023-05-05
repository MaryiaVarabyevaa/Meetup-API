import express from "express";
import authController from "../auth.controller";
import { passport } from "../oauth.strategy";
import { authenticateJWT } from "../jwtAuth.strategy";

const router = express.Router();

router.post('/registration', authController.signup);
router.post('/login', authController.login);
router.get('/refresh', authController.refresh);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.authenticateWithGoogle
  );
router.get('/profile', authenticateJWT, authController.showUserData);
router.get('/logout', authController.logout)

export { router };
