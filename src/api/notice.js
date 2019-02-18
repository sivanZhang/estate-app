import Ajax from '@/axios'
//获取通知列表
export const GET_Notice = async (params) => {
  return await Ajax.get('/notice/notice/?json', { params })
}
/**
 * @description 删除或添加评论
 * @param {Object} data 传给接口的参数对象
 */
export const POST_Reply = async (payload) => {
  return await Ajax.post('/reply/replies/?json', payload)
}
//获取评论
export const GET_Reply = async (params) => {
  return await Ajax.get('/reply/replies/?json', { params })
}