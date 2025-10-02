import { clientAxios, serverAxios } from "./axiosInstance";

const getAllNews = async (
    { news_type = 'all', offset = 0, limit = 10, cat_id, title, editor_id }
) => {
    try {
        const response = await clientAxios.get("news/all", {
            params: {
                news_type: news_type,
                cat_id: cat_id,
                offset: offset,
                title: title,
                limit: limit,
                editor_id: editor_id
            },
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getNewsDetail = async ({ id }) => {
    try {
        const response = await serverAxios.get(`/news_detail/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const updateView = async ({ id }) => {
    try {
        const response = await clientAxios.get(`news/view/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllNews,
    getNewsDetail,
    updateView
}