import { clientAxios, serverAxios } from "./axiosInstance";

const getAllFoto = async ({ news_type = 'all', title = '', offset = 0, limit = 10 }) => {
    try {
        const response = await clientAxios.get("/foto/all", {
            params: {
                news_type: news_type,
                title: title,
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
        const response = await serverAxios.get(`/foto_detail/${id}`);
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