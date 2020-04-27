import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'

import Logout from '../Logout'
import LoginForm from '../LoginForm'
import './index.scss'
import { SET_IS_OPENED } from '../../constants'

export default function Footer(props) {
  const userId = useSelector(state => state.user.userId)

  const dispatch = useDispatch()

  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
  const isLogged = !!userId

  // 使用 useSelector Hooks 获取 Redux Store 数据
  const isOpened = useSelector(state => state.user.isOpened)

  return (
    <View className="mine-footer">
      {isLogged && <Logout />}
      <View className="tuture-motto">
        {isLogged ? 'From 图雀社区 with Love ❤' : '您还未登录'}
      </View>
      <AtFloatLayout
        isOpened={isOpened}
        title="登录"
        onClose={() =>
          dispatch({ type: SET_IS_OPENED, payload: { isOpened: false } })
        }
      >
        <LoginForm />
      </AtFloatLayout>
    </View>
  )
}
