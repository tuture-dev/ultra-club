import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import { PostCard, PostForm } from '../../components'
import './index.scss'
import {
  SET_POST_FORM_IS_OPENED,
  SET_LOGIN_INFO,
  GET_POSTS,
} from '../../constants'
import Authing from '../../utils/authing/authing'

export default function Index() {
  const posts = useSelector(state => state.post.posts) || []
  const isOpened = useSelector(state => state.post.isOpened)
  const userId = useSelector(state => state.user.userId)

  const isLogged = !!userId

  const dispatch = useDispatch()

  useEffect(() => {
    const WeappEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (WeappEnv) {
      Taro.cloud.init()
    }

    async function getStorage() {
      // 在应用初始化的时候，对应用进行鉴权，检查登录状态，如果登录失效，则情况缓存信息
      try {
        const userPoolId = ''
        const { data: token } = await Taro.getStorage({ key: 'token' })
        const authing = new Authing({
          userPoolId,
        })
        const result = await Taro.request({
          url: `https://users.authing.cn/authing/token?access_token=${userInfo.token}`,
        })

        if (result.data.status) {
          const { data } = await Taro.getStorage({ key: 'userInfo' })

          const { nickName, avatar, _id } = data

          // 更新 Redux Store 数据
          dispatch({
            type: SET_LOGIN_INFO,
            payload: { nickName, avatar, userId: _id },
          })
        } else {
          await Taro.removeStorage({ key: 'userInfo' })
          await Taro.removeStorage({ key: 'token' })
        }
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    if (!isLogged) {
      getStorage()
    }

    async function getPosts() {
      try {
        // 更新 Redux Store 数据
        dispatch({
          type: GET_POSTS,
        })
      } catch (err) {
        console.log('getPosts ERR: ', err)
      }
    }

    if (!posts.length) {
      getPosts()
    }
  }, [])

  function setIsOpened(isOpened) {
    dispatch({ type: SET_POST_FORM_IS_OPENED, payload: { isOpened } })
  }

  function handleClickEdit() {
    if (!isLogged) {
      Taro.atMessage({
        type: 'warning',
        message: '您还未登录哦！',
      })
    } else {
      setIsOpened(true)
    }
  }

  console.log('posts', posts)

  return (
    <View className="index">
      <AtMessage />
      {posts.map(post => (
        <PostCard key={post._id} postId={post._id} post={post} isList />
      ))}
      <AtFloatLayout
        isOpened={isOpened}
        title="发表新文章"
        onClose={() => setIsOpened(false)}
      >
        <PostForm />
      </AtFloatLayout>
      <View className="post-button">
        <AtFab onClick={handleClickEdit}>
          <Text className="at-fab__icon at-icon at-icon-edit"></Text>
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
