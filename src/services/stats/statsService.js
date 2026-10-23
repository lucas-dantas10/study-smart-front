import api from "@/axios/api";

export async function getStats() {
    const { data } = await api.get("/api/v1/stats");

    return data;
}
