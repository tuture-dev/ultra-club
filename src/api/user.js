import Taro from '@tarojs/taro'

import { HEADER, LOGIN_URL, convertUserFormat } from './utils'

async function login(userInfo) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB

  // 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'login',
        data: {
          userInfo,
        },
      })

      return result.user
    } else if (isAlipay || isH5) {
      const { data } = await Taro.request({
        url: LOGIN_URL,
        method: 'POST',
        header: { ...HEADER },
        data: {
          userInfo,
        },
      })

      return convertUserFormat(data.result)
    }
  } catch (err) {
    console.error('login ERR: ', err)
  }
}

const userApi = {
  login,
}

export default userApi
