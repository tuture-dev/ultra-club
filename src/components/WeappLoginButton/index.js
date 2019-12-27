import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'

import './index.scss'

export default function LoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    await props.setLoginInfo(avatarUrl, nickName)

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
