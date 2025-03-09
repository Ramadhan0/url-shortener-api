
import Url from '../../models/url'


export const findUrl = async (short_code) => await Url.findOne({ where: { short_code } })

export const saveUrl = async (url) => Url.create(url)

export const findAllUsersUrls = async (user_id) => await Url.findAll({ where: { user_id } })

export const getExistingShortCodes = async () => {
    const urls = await Url.findAll({ attributes: ['short_code'] })
    return new Set(urls.map(url => url.short_code))
}

export const findUrlByUrl = async (data) => await Url.findOne({ where: data })

export const findUrlByUrlAddress = async (short_code) => await Url.findOne({ where: { short_code } })

