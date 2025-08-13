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

export async function save(front, back, deckId) {
    try {
        const { data } = await api.post("/api/v1/card", {
            deck_id: deckId,
            front_text: front,
            back_text: back
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function update(cardId, front, back) {
    try {
        const { data } = await api.put(`/api/v1/card/${cardId}`, {
            front_text: front,
            back_text: back
        });

        return data;
    } catch (error) {
        throw error;
    }
}


export async function remove(cardId) {
    try {
        await api.delete(`/api/v1/card/${cardId}`);
    } catch (error) {
        throw error;
    }
}
