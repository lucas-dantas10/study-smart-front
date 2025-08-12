import api from "@/axios/api";

export async function me() {
    try {
        const { data } = await api.get("/api/v1/me");

        return data;
    } catch (error) {
        // TODO: Gerenciar erro
    }
} 
