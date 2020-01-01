import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import './index.scss'
import { LOGIN } from '../../constants'

export default function WeappLoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useDispatch()

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    const userInfo = { avatar: avatarUrl, nickName }

    dispatch({
      type: LOGIN,
      payload: {
        userInfo: userInfo,
      },
    })

    setIsLogin(false)
  }

  return (
    <Button
      openType="getUserInfo"
      onGetUserInfo={onGetUserInfo}
      type="primary"
      className="login-button"
      loading={isLogin}
    >
      微信登录
    </Button>
  )
}
