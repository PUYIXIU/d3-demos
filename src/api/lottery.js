import axios from 'axios';
const baseUrl = 'http://127.0.0.1:18888' //服务地址

export const getTempData = ()=>
    axios.post(`${baseUrl}/getTempData`)