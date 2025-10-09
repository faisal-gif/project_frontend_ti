import { clientAxios, serverAxios } from "./axiosInstance";


const getAllKanal = async () => {
    try {
        const response = await clientAxios.get("/kanal/all");
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getKanalDetail = async ({ slug }) => {
    try {
        const response = await serverAxios.get(`/cat_detail/${slug}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllKanal,
    getKanalDetail
};