import {
  SET_POST,
  SET_POSTS,
  SET_POST_FORM_IS_OPENED,
  POST_ERROR,
  CREATE_POST,
  POST_NORMAL,
  POST_SUCCESS,
} from '../constants/'

import avatar from '../images/avatar.png'

const INITIAL_STATE = {
  posts: [],
  post: {},
  isOpened: false,
  isPost: false,
  postStatus: POST_NORMAL,
}

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_POST: {
      const { post } = action.payload
      return { ...state, post }
    }

    case SET_POSTS: {
      const { posts } = action.payload
      return { ...state, posts: state.posts.concat(...posts) }
    }

    case SET_POST_FORM_IS_OPENED: {
      const { isOpened } = action.payload

      return { ...state, isOpened }
    }

    case CREATE_POST: {
      return { ...state, postStatus: CREATE_POST, isPost: true }
    }

    case POST_SUCCESS: {
      return { ...state, postStatus: POST_SUCCESS, isPost: false }
    }

    case POST_ERROR: {
      return { ...state, postStatus: POST_ERROR, isPost: false }
    }

    default:
      return state
  }
}
