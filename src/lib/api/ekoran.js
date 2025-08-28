import axiosInstance from "./axiosInstance";

const getAllEkoran = async ({ offset = 0, limit = 10 }) => {
    try {
        const response = await axiosInstance.get("all_ekoran/", {
            params: {
                offset: offset,
                limit: limit
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getDetailEkoran = async (id) => {
    try {
        const response = await axiosInstance.get(`/koran_detail/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching detail ekoran:", error);
        throw error;
    }
}

export {
    getAllEkoran,
    getDetailEkoran
}