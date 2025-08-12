import api from "@/axios/api";

export async function getDecks() {
    try {
        const { data } = await api.get("/api/v1/deck");

        return data;
    } catch (error) {
        // TODO: Gerenciar erro
    }
}

export async function getDeck(deckId) {
    try {
        const { data } = await api.get(`/api/v1/deck/${deckId}`);

        return data;
    } catch (error) {
        // TODO: Gerenciar erro
    }
}

export async function create(title) {
    try {
        const { data } = await api.post(`/api/v1/deck`, {
            title: title
        });

        return data;
    } catch (error) {
        // TODO: Gerenciar erro
    }
}

export async function update(deckId, title) {
    try {
        const { data } = await api.put(`/api/v1/deck/${deckId}`, {
            title: title
        });

        return data;
    } catch (error) {
        // TODO: Gerenciar erro
    }
}

export async function remove(deckId) {
    try {
        await api.delete(`/api/v1/deck/${deckId}`);
    } catch (error) {
        // TODO: Gerenciar erro
    }
}
