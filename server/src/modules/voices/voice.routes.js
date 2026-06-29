import express from "express";
import {
    protect,
    requireAdmin,
} from "../auth/auth.middleware.js";
import {
    create,
    getById,
    list,
    remove,
    update,
} from "./voice.controller.js";
import {
    validateCreateVoice,
    validateListVoices,
    validateUpdateVoice,
    validateVoiceId,
} from "./voice.validation.js";

const router = express.Router();

router.use(protect);

router
    .route("/")
    .get(validateListVoices, list)
    .post(requireAdmin, validateCreateVoice, create);

router
    .route("/:voiceId")
    .get(validateVoiceId, getById)
    .patch(requireAdmin, validateUpdateVoice, update)
    .delete(requireAdmin, validateVoiceId, remove);

export default router;
