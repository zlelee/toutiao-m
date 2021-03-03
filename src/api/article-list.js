import request from '@/utils/request.js'
// 获取频道文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章详情
export const getArticleById = articleId => {
  return request({
    type: 'GET',
    url: ` /app/v1_0/articles/${articleId}`
  })
}
