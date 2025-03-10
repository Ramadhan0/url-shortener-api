import response from '../../helpers/responseHelper.js'
import { rateLimiter } from '../../middlewares/rateLimitingMiddleware.js'
import { generateUniqueShortCode } from '../../helpers/urlShortcodeHelper.js'
import { saveUrl, findAllUsersUrls , findUrlByUrl} from './urlShortenerService.js'


export const createUrl = async(req, res) => {

  try {
    const { user_id } = req.user
    const long_url = req.body.url

    const checkIfUrlExist = await findUrlByUrl({ long_url, user_id })
    if (checkIfUrlExist) return response(res, 400, 'You have shortened this url already')

    const short_code = await generateUniqueShortCode()
    const url = { user_id, short_code, long_url }

    const newUrl = await saveUrl(url)
    return response(res, 201, "Created", { short_code: newUrl.short_code })
  } catch (error) {
    console.log(error)
    return response(res, 500, 'Server Error', null, error)
  }
}

export const Urls = async (req, res) => {

  try {
    const { user_id } = req.user
    const urls = await findAllUsersUrls(user_id)
    return response(res, 200, 'success', urls)
  } catch (error) {
    return response(res, 500, 'Server Error', null, error)
  }
}


export const getUrl = [
  rateLimiter,
  async (req, res) => {
    try {
      const { shortUrl } = req.params
      const url = await findUrlByUrl({ short_code: shortUrl })
      if (!url) return response(res, 404, 'Not found')

      await url.increment('clicks')
      return response(res, 200, 'success', { url: url.long_url })
    } catch (error) {
      console.log(error)
      return response(res, 500, 'Server Error', null, error)
    }
  }
]

export const getUrlAnalytics = async (req, res) => {

  try {
    const { user_id } = req.user
    const { shortUrl } = req.params
    const url = await findUrlByUrl({ short_code: shortUrl, user_id })
    if (!url) return response(res, 404, 'Not found')
    
    return response(res, 200, 'success', { url: url.long_url, shortUrl, clicks: url.clicks })
  } catch (error) {
    console.log(error)
    return response(res, 500, 'Server Error', null, error)
  }
}

