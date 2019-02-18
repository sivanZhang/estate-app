import Ajax from '@/axios'
//delete或者cancel一条parking
export const POST_Parking = async(payload) => {
    return await Ajax.post('/parking/parking/?json', payload)
};
//获取parking列表，或者单个parking详情
export const GET_Parking = async(params = null) => {
    return await Ajax.get('/parking/parking/?json', { params })
};