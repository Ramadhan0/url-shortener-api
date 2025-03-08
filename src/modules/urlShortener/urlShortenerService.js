import { redisClient } from '../../index.js';


export const addUrlIntoRedis = async (proxyUrl) => {
    const jsonString = JSON.stringify(proxyUrl);
    return await redisClient.set('url', jsonString);
}

export const getUrlFromRedis = async () => {
    const jsonString = await redisClient.get('url');
    return JSON.parse(jsonString);;
}
