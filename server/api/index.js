import { Router } from 'express';

import { create, index, update, getById } from "./controller.js";

const router = Router();

router.get(
    "/",
    index
)

router.post(
    "/",
    create
)

router.put(
    "/:id",
    update
)

router.get(
    "/:id",
    getById
)

export default router;