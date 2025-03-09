import { redisClient } from '../index';


export const addUrlIntoRedis = async (proxyUrl) => {
    const jsonString = JSON.stringify(proxyUrl);
    return await redisClient.set('url', jsonString);
}

export const getDataFromRedis = async (key) => await redisClient.get(key);

export const saveRefreshTokenIntoRedis = async (token, email) => {
    await redisClient.set(`refreshToken:${email}`, token, {
      EX: 7 * 24 * 60 * 60,
    })
}
