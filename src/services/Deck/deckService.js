import api from "@/axios/api";

export async function getDecks() {
    const { data } = await api.get("/api/v1/deck");
    console.log(data);

    return data;
}
