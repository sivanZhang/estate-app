import Ajax from '@/axios'
//登录接口
export const POST_LOGIN = async(payload) => {
    return await Ajax.post('/users/login/?json', payload)
};
//获取资产列表
export const GET_Property = async() => {
        return await Ajax.get('/property/house/?json&myproperty');
    }
    //重置密码
export const GET_Password = async(params) => {
    return await Ajax.get(`/users/emailscode/${params}?json`);
}