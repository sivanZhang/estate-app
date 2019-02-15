import Ajax from '@/axios'
export const POST_Parking = async(payload) => {
    return await Ajax.post('/parking/parking/?json', payload)
};
export const GET_Parking = async(params = null) => {
    return await Ajax.get('/parking/parking/?json', { params })
};