import axios from 'axios';

const baseURL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com';

const api = axios.create({
    baseURL,
});

export const fetchInventory = async () => {
    try {
        const response = await api.get('/inventory');
        return response?.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};
