import Ajax from '@/axios'
export const GET_Repair = async(params = null) => {
    return await Ajax.get('/repair/repair/?json', { params })
}
export const POST_Repair = async(payload) => {
    return await Ajax.post('/repair/repair/?json', payload)
}