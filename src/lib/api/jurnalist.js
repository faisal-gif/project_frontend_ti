import { clientAxios } from "./axiosInstance";


const getWriterDetail = async ({ slug }) => {
    try {
        const response = await clientAxios.get(`/writer/detail/${slug}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getWriterDetail
}