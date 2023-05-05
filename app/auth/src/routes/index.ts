import express from "express";
import { router as auth } from "../auth/routes/index";
import { router as user } from "../user/routes/index";

const router = express.Router();

router.use('/', auth);
router.use('/', user);

export { router };
