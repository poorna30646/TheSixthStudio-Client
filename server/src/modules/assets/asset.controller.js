import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import {
    createAsset,
    deleteAsset,
    getAsset,
    listAssets,
    updateAsset,
} from "./asset.service.js";

export const create = asyncHandler(async (req, res) => {
    const asset = await createAsset({ ...req.body, user: req.user });
    res.status(201).json(
        new ApiResponse(201, "Asset created successfully", { asset })
    );
});

export const list = asyncHandler(async (req, res) => {
    const result = await listAssets(req.user, req.query);
    res.status(200).json(
        new ApiResponse(200, "Assets retrieved successfully", result)
    );
});

export const getById = asyncHandler(async (req, res) => {
    const asset = await getAsset(req.params.assetId, req.user);
    res.status(200).json(
        new ApiResponse(200, "Asset retrieved successfully", { asset })
    );
});

export const update = asyncHandler(async (req, res) => {
    const asset = await updateAsset(
        req.params.assetId,
        req.body,
        req.user
    );
    res.status(200).json(
        new ApiResponse(200, "Asset updated successfully", { asset })
    );
});

export const remove = asyncHandler(async (req, res) => {
    const asset = await deleteAsset(req.params.assetId, req.user);
    res.status(200).json(
        new ApiResponse(200, "Asset deleted successfully", {
            assetId: asset._id,
            deleted: true,
        })
    );
});
