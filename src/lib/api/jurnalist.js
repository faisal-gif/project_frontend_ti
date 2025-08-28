import axiosInstance from "./axiosInstance";


const getJurnalistDetail = async ({ slug }) => {
    try {
        const response = await axiosInstance.get(`jurnalis/`, {
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
    getJurnalistDetail
}