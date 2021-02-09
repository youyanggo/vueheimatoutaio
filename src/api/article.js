import request from '@/untils/request.js'
export const getArticles = params => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/articles',
    params
  })
}
export const getArticlesChannels = params => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/channels',
    params
  })
}
export const deletArticle = articleID => {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/articles/${articleID}`
  })
}
export const addArticles = (data, draft) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}
export const updatasArticle = (articleID, data, draft) => {
  return request({
    method: 'PUT',
    url: `mp/v1_0/articles/${articleID}`,
    data,
    params: {
      draft
    }
  })
}
export const getArticle = articleID => {
  return request({
    method: 'GET',
    url: `mp/v1_0/articles/${articleID}`
  })
}
export const updatacomments = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: 'mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
