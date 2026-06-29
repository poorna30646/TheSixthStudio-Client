import express from "express";
import { protect } from "../auth/auth.middleware.js";
import {
    create,
    getById,
    list,
    remove,
    update,
} from "./asset.controller.js";
import {
    validateAssetId,
    validateCreateAsset,
    validateListAssets,
    validateUpdateAsset,
} from "./asset.validation.js";

const router = express.Router();

router.use(protect);

router
    .route("/")
    .post(validateCreateAsset, create)
    .get(validateListAssets, list);

router
    .route("/:assetId")
    .get(validateAssetId, getById)
    .patch(validateUpdateAsset, update)
    .delete(validateAssetId, remove);

export default router;
