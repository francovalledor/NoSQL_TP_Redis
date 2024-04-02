import { Router } from "express";
import controller from "./controller";

export const router = Router();

router.get('/', controller.getDetails);
