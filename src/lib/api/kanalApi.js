import { clientAxios, serverAxios } from "./axiosInstance";


const getAllKanal = async () => {
    try {
        const response = await clientAxios.get("/kanal/all");
        return response.data.data;
    } catch (error) {
        console.error(`getAllKanal failed: ${error.message}`);
    }
};

const getKanalDetail = async ({ slug }) => {
    try {
        const response = await serverAxios.get(`/cat_detail/${slug}`);
        // children & parents adalah sibling dari data di response — ikutkan agar
        // halaman detail bisa menampilkan/memfilter sub-kanal.
        return {
            ...response.data.data,
            children: response.data.children || [],
            parents: response.data.parents || [],
        };
    } catch (error) {
        console.error(`getKanalDetail(${slug}) failed: ${error.message}`);
    }
};

// Kanal untuk halaman /kanal. Server-side (serverAxios).
// total_artikel = total artikel seluruh kanal (sibling dari data di response).
const getKanalTree = async () => {
    try {
        const response = await serverAxios.get("/kanal/", { params: { tree: 1 } });
        return {
            channels: response.data.data || [],
            total: Number(response.data.total_artikel) || 0,
        };
    } catch (error) {
        console.error(`getKanalTree failed: ${error.message}`);
        return { channels: [], total: 0 };
    }
};

export {
    getAllKanal,
    getKanalDetail,
    getKanalTree
};