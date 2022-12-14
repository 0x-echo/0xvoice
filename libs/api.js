import config from '../config'

export const API = {
  CREATE_USER: config.api + '/api/v1/users',
  GET_USER_INFO: config.api + '/api/v1/users/info',
  CREATE_POST: config.api  + '/api/v1/posts',
  GET_POST: config.api + '/api/v1/posts',
  GET_USERS: config.api + '/api/v1/users',
  FOLLOW: config.api + '/api/v1/friendships',
  UNFOLLOW: config.api + '/api/v1/friendships/:address',
  GET_POST_INFO: config.api + '/api/v1/posts/:id'
}
