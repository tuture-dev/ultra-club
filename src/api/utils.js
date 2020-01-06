const API_BASE_URL = ''

const LOGIN_URL = `${API_BASE_URL}/1.1/functions/login`
const CREATE_POST_URL = `${API_BASE_URL}/1.1/functions/createPost`
const GET_POST_URL = `${API_BASE_URL}/1.1/functions/getPost`
const GET_POSTS_URL = `${API_BASE_URL}/1.1/functions/getPosts`

const HEADER = {
  'X-LC-Prod': 1,
  'X-LC-Id': '',
  'X-LC-Key': '',
}

const convertUserFormat = user => {
  const _id = user.objectId
  delete user.objectId

  return { ...user, _id }
}

const convertPostFormat = post => {
  const _id = post.objectId
  const user = convertUserFormat(post.user)

  delete post.objectId
  delete post.user

  return { ...post, _id, user }
}

const convertPostsFormat = posts => {
  const convertedPosts = posts.map(post => convertPostFormat(post))

  return convertedPosts
}

export {
  LOGIN_URL,
  HEADER,
  CREATE_POST_URL,
  GET_POST_URL,
  GET_POSTS_URL,
  convertPostsFormat,
  convertPostFormat,
  convertUserFormat,
}
