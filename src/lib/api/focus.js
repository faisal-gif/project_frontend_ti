import { clientAxios } from "./axiosInstance";

const getAllFocus = async ({ offset = 0, limit = 10 }) => {
    try {
        const response = await clientAxios.get("/focus/all", {
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

const getFocusDetail = async ({ id }) => {
    try {
        const response = await clientAxios.get(`focus/detail/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllFocus,
    getFocusDetail,
};