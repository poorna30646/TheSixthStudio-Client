import mongoose from "mongoose";

export const ASSET_TYPES = Object.freeze([
    "image",
    "video",
    "audio",
    "document",
    "archive",
    "other",
]);

export const ASSET_CATEGORIES = Object.freeze([
    "avatars",
    "images",
    "videos",
    "audio",
    "thumbnails",
    "templates",
    "voices",
    "exports",
    "temp",
]);

export const ASSET_STATUSES = Object.freeze([
    "pending",
    "ready",
    "failed",
    "deleted",
]);

const assetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            immutable: true,
            index: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null,
            immutable: true,
            index: true,
        },
        type: {
            type: String,
            enum: ASSET_TYPES,
            required: true,
            immutable: true,
            index: true,
        },
        category: {
            type: String,
            enum: ASSET_CATEGORIES,
            required: true,
            immutable: true,
            index: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            immutable: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
            immutable: true,
        },
        mimeType: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            immutable: true,
            index: true,
        },
        extension: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            immutable: true,
            index: true,
        },
        size: {
            type: Number,
            required: true,
            min: 1,
            immutable: true,
        },
        status: {
            type: String,
            enum: ASSET_STATUSES,
            default: "pending",
            index: true,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        isPublic: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
        minimize: false,
        versionKey: false,
    }
);

assetSchema.index({ user: 1, createdAt: -1 });
assetSchema.index({ user: 1, project: 1, category: 1, status: 1 });
assetSchema.index({ user: 1, type: 1, mimeType: 1 });

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
