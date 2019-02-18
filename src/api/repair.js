import Ajax from '@/axios'
//获取Repair列表或者单个repair详情
export const GET_Repair = async(params = null) => {
    return await Ajax.get('/repair/repair/?json', { params })
}
//delete或者 cancel一条repair
export const POST_Repair = async(payload) => {
    return await Ajax.post('/repair/repair/?json', payload)
}