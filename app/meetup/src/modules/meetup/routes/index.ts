import express from "express";
import { router as meetup} from "./meetup";

const router = express.Router();

router.use('/auth', meetup);

export { router };