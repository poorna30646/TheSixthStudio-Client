import ApiError from "../../utils/ApiError.js";
import voiceRepository from "./voice.repository.js";

const getVoiceOrThrow = async (voiceId) => {
    const voice = await voiceRepository.findById(voiceId);
    if (!voice) throw new ApiError(404, "Voice not found");
    return voice;
};

export const createVoice = (data) =>
    voiceRepository.create({
        provider: data.provider,
        voiceId: data.voiceId,
        language: data.language,
        gender: data.gender,
        sampleUrl: data.sampleUrl ?? null,
        previewUrl: data.previewUrl ?? null,
        status: data.status || "active",
    });

export const listVoices = (filters) => voiceRepository.list(filters);

export const getVoice = (voiceId) => getVoiceOrThrow(voiceId);

export const updateVoice = async (voiceId, changes) => {
    await getVoiceOrThrow(voiceId);
    return voiceRepository.updateById(voiceId, changes);
};

export const deleteVoice = async (voiceId) => {
    await getVoiceOrThrow(voiceId);
    await voiceRepository.deleteById(voiceId);
    return { voiceId, deleted: true };
};

export default {
    createVoice,
    listVoices,
    getVoice,
    updateVoice,
    deleteVoice,
};
