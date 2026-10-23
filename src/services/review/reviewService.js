import api from "@/axios/api";

export async function undoReview(cardId) {
    await api.delete(`/api/v1/review/${cardId}/last`);
}

export async function review(cardId, quality) {
    try {
        await api.post(`/api/v1/review/${cardId}`, {
            quality: quality
        });
    } catch (error) {
        throw error;
    }
}
