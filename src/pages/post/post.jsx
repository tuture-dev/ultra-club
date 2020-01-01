import Taro, { useRouter, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'

import { PostCard } from '../../components'
import './post.scss'
import { GET_POST, SET_POST } from '../../constants'

export default function Post() {
  const router = useRouter()
  const { postId } = router.params

  const dispatch = useDispatch()
  const post = useSelector(state => state.post.post)

  useEffect(() => {
    dispatch({
      type: GET_POST,
      payload: {
        postId,
      },
    })

    return () => {
      dispatch({ type: SET_POST, payload: { post: {} } })
    }
  }, [])

  return (
    <View className="post">
      <PostCard post={post} />
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情',
}
