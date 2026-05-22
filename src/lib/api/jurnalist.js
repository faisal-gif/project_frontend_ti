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

        // Hapus parameter key, sisakan parameter name saja
        const apiUrlWithParams = `${apiUrl}?name=${slug}`;

        const response = await fetch(apiUrlWithParams, {
            // Tambahkan x-api-key di headers
            headers: {
                'x-api-key': process.env.SECRET_KEY
            },
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