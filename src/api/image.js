import request from '@/untils/request.js'
export const uploadimage = data => {
  return request({
    method: 'post',
    url: 'mp/v1_0/user/images',
    data
  })
}
export const getimageed = params => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/images',
    params
  })
}
export const collexteimageed = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
export const deleteimgea = imageID => {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/user/images/${imageID}`
  })
}
