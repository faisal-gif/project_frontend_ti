import { clientAxios, serverAxios } from "./axiosInstance";


const getWriterDetail = async ({ slug }) => {
    try {
        const response = await serverAxios.get(`/jurnalis/`, {
            params: {
                name: slug
            },
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getWriterDetailServer = async ({ slug }) => {
    try {
        const apiUrl = `${process.env.API_URL}/jurnalis/`;

        const apiUrlWithKey = `${apiUrl}?key=${process.env.SECRET_KEY}&name=${slug}`;

        const response = await fetch(apiUrlWithKey, {

            next: { revalidate: 300 },
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();

        return data.data;


    } catch (error) {
        console.log(error);
    }
};





export {
    getWriterDetail,
    getWriterDetailServer 
}