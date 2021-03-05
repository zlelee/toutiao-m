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

// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// 文章点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${target}`
  })
}
