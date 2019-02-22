import Ajax from '@/axios'
//登录接口
export const POST_LOGIN = async (payload) => {
  return await Ajax.post('/users/login/?json', payload)
};
//获取资产列表
export const GET_Property = async () => {
  return await Ajax.get('/property/house/?json&myproperty');
}
//获取验证码
export const GET_Password = async (params) => {
  return await Ajax.get(`/users/emailscode/${params}?json`);
}
//重置密码
export const SET_Password = async (payload) => {
  return await Ajax.get(`/users/find_password/?json`, payload);
}