import request from '@/utils/request.js'

// 获取文章评论
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 点赞文章评论
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export function deleteCommentLike(commentId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
