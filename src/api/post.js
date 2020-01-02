import Taro from '@tarojs/taro'

import {
  HEADER,
  CREATE_POST_URL,
  GET_POSTS_URL,
  GET_POST_URL,
  convertPostFormat,
  convertPostsFormat,
} from './utils'

async function createPost(postData, userId) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB

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
    } else if (isAlipay || isH5) {
      const { data } = await Taro.request({
        url: CREATE_POST_URL,
        method: 'POST',
        header: { ...HEADER },
        data: {
          postData,
          userId,
        },
      })

      return convertPostFormat(data.result)
    }
  } catch (err) {
    console.error('createPost ERR: ', err)
  }
}

async function getPosts() {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB

  // 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'getPosts',
      })

      return result.posts
    } else if (isAlipay || isH5) {
      const { data } = await Taro.request({
        url: GET_POSTS_URL,
        method: 'POST',
        header: { ...HEADER },
      })

      return convertPostsFormat(data.result)
    }
  } catch (err) {
    console.error('getPosts ERR: ', err)
  }
}

async function getPost(postId) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB

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
    } else if (isAlipay || isH5) {
      const { data } = await Taro.request({
        url: GET_POST_URL,
        method: 'POST',
        header: { ...HEADER },
        data: {
          postId,
        },
      })

      return convertPostFormat(data.result)
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
