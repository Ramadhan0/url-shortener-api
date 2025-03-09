import crypto from 'crypto';
import { getExistingShortCodes } from '../modules/urlShortener/urlShortenerService';


export const generateUniqueShortCode = async () => {
  const existingIds = await getExistingShortCodes()
  let id;
  do {
    id = crypto.randomBytes(4).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 7);
  } while (existingIds.has(id))
  return id
}
