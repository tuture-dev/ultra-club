import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { postApi } from '../api'
import {
  GET_POST,
  GET_POSTS,
  CREATE_POST,
  POST_SUCCESS,
  POST_ERROR,
  SET_POSTS,
  SET_POST,
  SET_POST_FORM_IS_OPENED,
} from '../constants'

/***************************** 发帖逻辑开始 ************************************/

function* createPost(postData, userId) {
  try {
    const post = yield call(postApi.createPost, postData, userId)

    // 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

    // 发起发帖成功的 action
    yield put({ type: POST_SUCCESS })

    // 关闭发帖框弹出层
    yield put({ type: SET_POST_FORM_IS_OPENED, payload: { isOpened: false } })

    // 更新 Redux store 数据
    yield put({
      type: SET_POSTS,
      payload: {
        posts: [post],
      },
    })

    // 提示发帖成功
    Taro.atMessage({
      message: '发表文章成功',
      type: 'success',
    })
  } catch (err) {
    console.log('createPost ERR: ', err)

    // 发帖失败，发起失败的 action
    yield put({ type: POST_ERROR })

    // 提示发帖失败
    Taro.atMessage({
      message: '发表文章失败',
      type: 'error',
    })
  }
}

function* watchCreatePost() {
  while (true) {
    const { payload } = yield take(CREATE_POST)

    console.log('payload', payload)

    yield fork(createPost, payload.postData, payload.userId)
  }
}

/***************************** 发帖逻辑结束 ************************************/

/***************************** 获取所有帖子逻辑开始 ************************************/

function* getPosts() {
  try {
    const posts = yield call(postApi.getPosts)

    // 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

    // 发起获取帖子成功的 action
    yield put({ type: POST_SUCCESS })

    // 更新 Redux store 数据
    yield put({
      type: SET_POSTS,
      payload: {
        posts,
      },
    })
  } catch (err) {
    console.log('getPosts ERR: ', err)

    // 获取帖子失败，发起失败的 action
    yield put({ type: POST_ERROR })
  }
}

function* watchGetPosts() {
  while (true) {
    yield take(GET_POSTS)

    yield fork(getPosts)
  }
}

/***************************** 获取所有帖子逻辑结束 ************************************/

/***************************** 获取单个帖子逻辑开始 ************************************/

function* getPost(postId) {
  try {
    const post = yield call(postApi.getPost, postId)

    // 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

    // 发起获取帖子成功的 action
    yield put({ type: POST_SUCCESS })

    // 更新 Redux store 数据
    yield put({
      type: SET_POST,
      payload: {
        post,
      },
    })
  } catch (err) {
    console.log('getPost ERR: ', err)

    // 获取帖子失败，发起失败的 action
    yield put({ type: POST_ERROR })
  }
}

function* watchGetPost() {
  while (true) {
    const { payload } = yield take(GET_POST)

    yield fork(getPost, payload.postId)
  }
}

/***************************** 获取单个帖子逻辑结束 ************************************/

export { watchCreatePost, watchGetPosts, watchGetPost }
