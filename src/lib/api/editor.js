import { clientAxios } from "./axiosInstance";


const getEditorDetail = async ({ slug }) => {
    try {
        const response = await clientAxios.get(`/editor/detail/${slug}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getEditorDetail
}