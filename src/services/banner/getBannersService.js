import { getBanner } from "~/models/bannerModel"

export const getBannersService = async (req) => {
  try {
    const position = req?.query?.position || null
    const _destroy = Boolean(req?.query?._destroy) || false
    const limit = Number(req?.query?.limit) || -1
    let query = {_destroy: _destroy}
    if(position) query.position = position
    const banners = await getBanner(query, limit)
    return banners
  } catch (error) {
    throw error
  }
}