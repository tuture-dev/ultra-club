import Taro from '@tarojs/taro'

async function createPost(postData, userId) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

  console.log('postData', postData, userId)

  // 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'createPost',
        data: {
          postData,
          userId,
        },
      })

      return result.post
    }
  } catch (err) {
    console.error('createPost ERR: ', err)
  }
}

async function getPosts() {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

  // 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'getPosts',
      })

      return result.posts
    }
  } catch (err) {
    console.error('getPosts ERR: ', err)
  }
}

async function getPost(postId) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

  // 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'getPost',
        data: {
          postId,
        },
      })

      return result.post
    }
  } catch (err) {
    console.error('getPost ERR: ', err)
  }
}

const postApi = {
  createPost,
  getPosts,
  getPost,
}

export default postApi
