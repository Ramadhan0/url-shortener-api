import Url from '../../models/url.js'
import response from '../../helpers/responseHelper.js'
import { addUrlIntoRedis, getUrlFromRedis } from './urlShortenerService.js'


export const Urls = async (req, res) => {

  try {
    const urls = await Url.findAll()

    return response(res, 200, 'success', urls)
  } catch (error) {
    return response(res, 500, 'Server Error', error)
  }
}

export const getUrl = async (req, res) => {

  try {
    const { userId } = req.userId
    // const urls = await Url.Url.findAll({ where: { user_id: userId } })
    const urls = await Url.findAll()

    return response(res, 200, 'success', urls)
  } catch (error) {
    return response(res, 500, 'Server Error', error)
  }
}
