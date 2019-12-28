import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import { PostCard, PostForm } from '../../components'
import './index.scss'
import { SET_POST_FORM_IS_OPENED, SET_LOGIN_INFO } from '../../constants'

export default function Index() {
  const posts = useSelector(state => state.post.posts) || []
  const isOpened = useSelector(state => state.post.isOpened)
  const nickName = useSelector(state => state.user.nickName)

  const isLogged = !!nickName

  const dispatch = useDispatch()

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName, avatar } = data

        // 更新 Redux Store 数据
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName, avatar } })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    getStorage()
  })

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
      {posts.map((post, index) => (
        <PostCard key={index} postId={index} post={post} isList />
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
