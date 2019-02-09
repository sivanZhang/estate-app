import Ajax from '@/axios'
//获取未读通知列表
export const GET_Notice = async(params) => {
    return await Ajax.get('/notice/notice/?json', { params })
}