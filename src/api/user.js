import Taro from '@tarojs/taro'

async function login(userInfo) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

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
    }
  } catch (err) {
    console.error('login ERR: ', err)
  }
}

const userApi = {
  login,
}

export default userApi
