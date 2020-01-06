import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { userApi } from '../api'
import {
  SET_LOGIN_INFO,
  LOGIN_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  SET_IS_OPENED,
} from '../constants'

/***************************** 登录逻辑开始 ************************************/

function* login(userInfo) {
  try {
    const user = yield call(userApi.login, userInfo)

    // 将用户信息缓存在本地
    yield Taro.setStorage({ key: 'userInfo', data: user })

    // 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

    // 发起登录成功的 action
    yield put({ type: LOGIN_SUCCESS })

    // 关闭登录框弹出层
    yield put({ type: SET_IS_OPENED, payload: { isOpened: false } })

    // 更新 Redux store 数据
    const { nickName, avatar, _id } = user
    yield put({
      type: SET_LOGIN_INFO,
      payload: { nickName, avatar, userId: _id },
    })

    // 提示登录成功
    Taro.atMessage({ type: 'success', message: '恭喜您！登录成功！' })
  } catch (err) {
    console.log('login ERR: ', err)

    // 登录失败，发起失败的 action
    yield put({ type: LOGIN_ERROR })

    // 提示登录失败
    Taro.atMessage({ type: 'error', message: '很遗憾！登录失败！' })
  }
}

function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN)

    console.log('payload', payload)

    yield fork(login, payload.userInfo)
  }
}

/***************************** 登录逻辑结束 ************************************/

export { watchLogin }
