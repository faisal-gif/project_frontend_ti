import { clientAxios } from "./axiosInstance";


const getAllKanal = async () => {
    try {
        const response = await clientAxios.get("/kanal/all");
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};


export {
    getAllKanal,
};