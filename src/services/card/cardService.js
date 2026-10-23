import api from "@/axios/api";

export async function getCardsByDeckId(deckId) {
    try {
        const { data } = await api.get(`/api/v1/card/${deckId}/deck`);

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getCardsByStudy(deckId) {
    try {
        const { data } = await api.get(`/api/v1/card/${deckId}/study`);

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getCardById(cardId) {
    try {
        const { data } = await api.get(`/api/v1/card/${cardId}`);

        return data;
    } catch (error) {
        throw error;
    }
}

export async function save(front, back, deckId, tags = []) {
    try {
        const { data } = await api.post("/api/v1/card", {
            deck_id: deckId,
            front_text: front,
            back_text: back,
            tags
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function update(cardId, front, back, tags) {
    try {
        const { data } = await api.put(`/api/v1/card/${cardId}`, {
            front_text: front,
            back_text: back,
            // sem tags no corpo o servidor mantém as que o card já tem
            ...(tags !== undefined && { tags })
        });

        return data;
    } catch (error) {
        throw error;
    }
}


export async function searchCards({ q, tag, deckId } = {}) {
    const params = {};

    if (q) params.q = q;
    if (tag) params.tag = tag;
    if (deckId) params.deck_id = deckId;

    const { data } = await api.get("/api/v1/card/search", { params });

    return data;
}

export async function bulkCreate(deckId, cards) {
    const { data } = await api.post("/api/v1/card/bulk", {
        deck_id: deckId,
        cards: cards.map(({ front, back, tags }) => ({
            front_text: front,
            back_text: back,
            tags: tags || []
        }))
    });

    return data;
}

export async function remove(cardId) {
    try {
        await api.delete(`/api/v1/card/${cardId}`);
    } catch (error) {
        throw error;
    }
}
