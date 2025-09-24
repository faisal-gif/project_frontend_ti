import { clientAxios } from "./axiosInstance";

const getAllYoutubeVideos = async (
) => {
    try {
        const response = await clientAxios.get("youtube/playlist");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export {
    getAllYoutubeVideos
}