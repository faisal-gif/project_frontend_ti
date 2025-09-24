import { clientAxios } from "./axiosInstance";


const getPageDetail = async ({ slug }) => {
    try {
        const response = await clientAxios.get(`page/detail/${slug}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getPageDetail
}