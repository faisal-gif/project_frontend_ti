import axiosInstance from "./axiosInstance";


const getEditorDetail = async ({ slug }) => {
    try {
        const response = await axiosInstance.get(`editor/`, {
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
    getEditorDetail
}