import mongoose from "mongoose";

export const VOICE_GENDERS = Object.freeze([
    "male",
    "female",
    "neutral",
    "other",
]);

export const VOICE_STATUSES = Object.freeze([
    "active",
    "inactive",
    "deprecated",
]);

const isHttpUrl = (value) => {
    if (value === null || value === undefined || value === "") return true;
    try {
        return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
        return false;
    }
};

const voiceSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 2,
            maxlength: 50,
            match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            index: true,
        },
        voiceId: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 128,
            match: /^[A-Za-z0-9._:-]+$/,
        },
        language: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 35,
            match: /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/,
            index: true,
        },
        gender: {
            type: String,
            required: true,
            enum: VOICE_GENDERS,
            index: true,
        },
        sampleUrl: {
            type: String,
            trim: true,
            default: null,
            validate: {
                validator: isHttpUrl,
                message: "sampleUrl must be a valid HTTP or HTTPS URL",
            },
        },
        previewUrl: {
            type: String,
            trim: true,
            default: null,
            validate: {
                validator: isHttpUrl,
                message: "previewUrl must be a valid HTTP or HTTPS URL",
            },
        },
        status: {
            type: String,
            enum: VOICE_STATUSES,
            default: "active",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

voiceSchema.index({ provider: 1, voiceId: 1 }, { unique: true });
voiceSchema.index({ provider: 1, language: 1, gender: 1, status: 1 });
voiceSchema.index({ voiceId: "text", provider: "text", language: "text" });

const Voice = mongoose.model("Voice", voiceSchema);

export default Voice;
