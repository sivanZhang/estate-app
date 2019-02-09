import Ajax from '@/axios'
export const POST_LOGIN = async(payload) => {
    return await Ajax.post('/users/login/?json', payload)
};
//获取资产列表
export const GET_Property = async() => {
    return await Ajax.get('/property/house/?json&myproperty') /* ?myproperty */
}