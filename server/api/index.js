import { Router } from 'express';

import { create, index, update, getById, deleteReview } from "./controller.js";

const router = Router();

router.get(
    "/reviews",
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

router.delete(
    "/:id",
    deleteReview
)

export default router;