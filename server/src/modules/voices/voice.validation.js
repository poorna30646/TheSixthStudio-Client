import { body, param, query } from "express-validator";
import validationMiddleware from "../../middleware/validation.middleware.js";
import { VOICE_GENDERS, VOICE_STATUSES } from "./voice.model.js";

const SORT_FIELDS = [
    "createdAt",
    "updatedAt",
    "provider",
    "voiceId",
    "language",
    "gender",
    "status",
];

const providerValidator = (optional = false) => {
    const validator = body("provider");
    if (optional) validator.optional();
    return validator
        .trim()
        .toLowerCase()
        .isLength({ min: 2, max: 50 })
        .withMessage("provider must contain 2 to 50 characters")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("provider must be a lowercase slug");
};

const externalVoiceIdValidator = (optional = false) => {
    const validator = body("voiceId");
    if (optional) validator.optional();
    return validator
        .trim()
        .isLength({ min: 1, max: 128 })
        .withMessage("voiceId must contain 1 to 128 characters")
        .matches(/^[A-Za-z0-9._:-]+$/)
        .withMessage("voiceId contains unsupported characters");
};

const languageValidator = (optional = false) => {
    const validator = body("language");
    if (optional) validator.optional();
    return validator
        .trim()
        .isLength({ min: 2, max: 35 })
        .withMessage("language must contain 2 to 35 characters")
        .matches(/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/)
        .withMessage("language must be a valid BCP 47 language tag");
};

const genderValidator = (optional = false) => {
    const validator = body("gender");
    if (optional) validator.optional();
    return validator
        .isIn(VOICE_GENDERS)
        .withMessage(`gender must be one of: ${VOICE_GENDERS.join(", ")}`);
};

const statusValidator = body("status")
    .optional()
    .isIn(VOICE_STATUSES)
    .withMessage(`status must be one of: ${VOICE_STATUSES.join(", ")}`);

const urlValidator = (field) =>
    body(field)
        .optional({ nullable: true })
        .trim()
        .isURL({
            protocols: ["http", "https"],
            require_protocol: true,
            require_valid_protocol: true,
        })
        .withMessage(`${field} must be a valid HTTP or HTTPS URL`);

const allowedFields = new Set([
    "provider",
    "voiceId",
    "language",
    "gender",
    "sampleUrl",
    "previewUrl",
    "status",
]);

const fieldsValidator = (requireValue) =>
    body().custom((value) => {
        const keys = Object.keys(value);
        if (requireValue && !keys.length) {
            throw new Error("At least one update field is required");
        }
        const unknown = keys.filter((key) => !allowedFields.has(key));
        if (unknown.length) {
            throw new Error(`Unknown fields: ${unknown.join(", ")}`);
        }
        return true;
    });

export const validateCreateVoice = [
    providerValidator(),
    externalVoiceIdValidator(),
    languageValidator(),
    genderValidator(),
    urlValidator("sampleUrl"),
    urlValidator("previewUrl"),
    statusValidator,
    fieldsValidator(false),
    validationMiddleware,
];

export const validateUpdateVoice = [
    param("voiceId")
        .isMongoId()
        .withMessage("A valid voice document ID is required"),
    providerValidator(true),
    externalVoiceIdValidator(true),
    languageValidator(true),
    genderValidator(true),
    urlValidator("sampleUrl"),
    urlValidator("previewUrl"),
    statusValidator,
    fieldsValidator(true),
    validationMiddleware,
];

export const validateListVoices = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page must be a positive integer")
        .toInt(),
    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("limit must be between 1 and 100")
        .toInt(),
    query("search")
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("search must contain 1 to 100 characters"),
    query("provider")
        .optional()
        .trim()
        .toLowerCase()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("provider must be a lowercase slug"),
    query("language")
        .optional()
        .trim()
        .matches(/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/)
        .withMessage("language must be a valid BCP 47 language tag"),
    query("gender")
        .optional()
        .isIn(VOICE_GENDERS)
        .withMessage(`gender must be one of: ${VOICE_GENDERS.join(", ")}`),
    query("status")
        .optional()
        .isIn(VOICE_STATUSES)
        .withMessage(`status must be one of: ${VOICE_STATUSES.join(", ")}`),
    query("sortBy")
        .optional()
        .isIn(SORT_FIELDS)
        .withMessage(`sortBy must be one of: ${SORT_FIELDS.join(", ")}`),
    query("sortOrder")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("sortOrder must be asc or desc"),
    validationMiddleware,
];

export const validateVoiceId = [
    param("voiceId")
        .isMongoId()
        .withMessage("A valid voice document ID is required"),
    validationMiddleware,
];
