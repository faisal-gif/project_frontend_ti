import { clientAxios } from "./axiosInstance";

const getAllFoto = async ({ news_type = 'all', offset = 0, limit = 10 }) => {
    try {
        const response = await clientAxios.get("/foto/all", {
            params: {
                news_type: news_type,
                offset: offset,
                limit: limit
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getFotoDetail = async ({ id }) => {
    try {
        const response = await clientAxios.get(`/foto/detail/${id}`);
        return response.data.data
    }
    catch (error) {
        console.log(error);
    }
}

const getFotoSlide = async ({ id }) => {
    try {
        const response = await clientAxios.get(`/foto/slide/${id}`);
        return response.data.data
    }
    catch (error) {
        console.log(error);
    }
}

export {
    getAllFoto,
    getFotoDetail,
    getFotoSlide
}