import axiosInstance from "./axiosInstance";

const getDetailKanal = async (slug) => {
    try {
        const response = await apiDetailKanal.get(`/cat_detail/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching detail kanal:", error);
        throw error;
    }
}

export default {
    getDetailKanal
};