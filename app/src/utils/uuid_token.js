import { v4 as uuidv4 } from 'uuid';
//生成一个随机的字符串，且每次执行不能发生变化
export const getUUID = ()=>{
    //先从本地存储获取uuid（查看里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有
    if(!uuid_token){
        //随机生成一个uuid
        uuid_token = uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token;
}