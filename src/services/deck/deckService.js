import api from "@/axios/api";

export async function getDecks() {
    const { data } = await api.get("/api/v1/deck");

    return data;
}

export async function getDeck(deckId) {
    const { data } = await api.get(`/api/v1/deck/${deckId}`);

    return data;
}
