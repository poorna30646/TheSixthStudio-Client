import Voice from "./voice.model.js";
import ApiError from "../../utils/ApiError.js";

const SORT_FIELDS = new Set([
    "createdAt",
    "updatedAt",
    "provider",
    "voiceId",
    "language",
    "gender",
    "status",
]);

const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

class VoiceRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            if (error.code === 11000) {
                throw new ApiError(
                    409,
                    "This provider voice already exists"
                );
            }
            throw new ApiError(422, `Unable to create voice: ${error.message}`);
        }
    }

    async findById(voiceId) {
        return this.model.findById(voiceId);
    }

    async list(options) {
        const {
            page = 1,
            limit = 20,
            search,
            provider,
            language,
            gender,
            status,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = options;

        const query = {};
        if (provider) query.provider = provider;
        if (language) {
            query.language = new RegExp(`^${escapeRegex(language)}$`, "i");
        }
        if (gender) query.gender = gender;
        if (status) query.status = status;

        if (search) {
            const pattern = escapeRegex(search.trim());
            query.$or = [
                { voiceId: { $regex: pattern, $options: "i" } },
                { provider: { $regex: pattern, $options: "i" } },
                { language: { $regex: pattern, $options: "i" } },
            ];
        }

        const safeSortBy = SORT_FIELDS.has(sortBy) ? sortBy : "createdAt";
        const direction = sortOrder === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;

        const [voices, total] = await Promise.all([
            this.model
                .find(query)
                .sort({ [safeSortBy]: direction, _id: direction })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.model.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / limit);
        return {
            voices,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    async updateById(voiceId, changes) {
        try {
            return await this.model.findByIdAndUpdate(
                voiceId,
                { $set: changes },
                { new: true, runValidators: true }
            );
        } catch (error) {
            if (error.code === 11000) {
                throw new ApiError(
                    409,
                    "This provider voice already exists"
                );
            }
            throw new ApiError(422, `Unable to update voice: ${error.message}`);
        }
    }

    async deleteById(voiceId) {
        return this.model.findByIdAndDelete(voiceId);
    }
}

export default new VoiceRepository(Voice);
