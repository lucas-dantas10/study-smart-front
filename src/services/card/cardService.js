import api from "@/axios/api";

export async function getCardsByDeckId(deckId) {
    const { data } = await api.get(`/api/v1/card/${deckId}/deck`);

    return data;
}
