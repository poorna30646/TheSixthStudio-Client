import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import {
    createVoice,
    deleteVoice,
    getVoice,
    listVoices,
    updateVoice,
} from "./voice.service.js";

export const create = asyncHandler(async (req, res) => {
    const voice = await createVoice(req.body);
    res.status(201).json(
        new ApiResponse(201, "Voice created successfully", { voice })
    );
});

export const list = asyncHandler(async (req, res) => {
    const result = await listVoices(req.query);
    res.status(200).json(
        new ApiResponse(200, "Voices retrieved successfully", result)
    );
});

export const getById = asyncHandler(async (req, res) => {
    const voice = await getVoice(req.params.voiceId);
    res.status(200).json(
        new ApiResponse(200, "Voice retrieved successfully", { voice })
    );
});

export const update = asyncHandler(async (req, res) => {
    const voice = await updateVoice(req.params.voiceId, req.body);
    res.status(200).json(
        new ApiResponse(200, "Voice updated successfully", { voice })
    );
});

export const remove = asyncHandler(async (req, res) => {
    const result = await deleteVoice(req.params.voiceId);
    res.status(200).json(
        new ApiResponse(200, "Voice deleted successfully", result)
    );
});
