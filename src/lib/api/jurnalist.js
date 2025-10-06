import { serverAxios } from "./axiosInstance";


const getWriterDetail = async ({ slug }) => {
    try {
        const response = await serverAxios.get(`/jurnalis/`,{
           params: {
                name: slug
            },
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getWriterDetail
}