import { SET_LOGIN_INFO, SET_IS_OPENED } from '../constants/'

const INITIAL_STATE = {
  avatar: '',
  nickName: '',
  isOpened: false,
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_OPENED: {
      const { isOpened } = action.payload

      return { ...state, isOpened }
    }

    case SET_LOGIN_INFO: {
      const { avatar, nickName } = action.payload

      return { ...state, nickName, avatar }
    }

    default:
      return state
  }
}
