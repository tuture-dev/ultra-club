import { fork, all } from 'redux-saga/effects'

import { watchLogin } from './user'
import { watchCreatePost, watchGetPosts, watchGetPost } from './post'

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchCreatePost),
    fork(watchGetPosts),
    fork(watchGetPost),
  ])
}
