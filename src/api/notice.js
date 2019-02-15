import Ajax from '@/axios'
//获取未读通知列表
export const GET_Notice = async(params) => {
        return await Ajax.get('/notice/notice/?json', { params })
    }
    //提交或删除评论
export const POST_Reply = async(params) => {
        return await Ajax.get('/notice/notice/?json', { params })
    }
    //获取评论
export const GET_Reply = async(params) => {
    return await Ajax.get('/reply/replies/?json', { params })
}