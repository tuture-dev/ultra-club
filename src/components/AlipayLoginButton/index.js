import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'

import './index.scss'

export default function LoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)

  async function onGetAuthorize(res) {
    setIsLogin(true)
    try {
      let userInfo = await Taro.getOpenUserInfo()

      userInfo = JSON.parse(userInfo.response).response
      const { avatar, nickName } = userInfo

      await props.setLoginInfo(avatar, nickName)
    } catch (err) {
      console.log('onGetAuthorize ERR: ', err)
    }

    setIsLogin(false)
  }

  return (
    <Button
      openType="getAuthorize"
      scope="userInfo"
      onGetAuthorize={onGetAuthorize}
      type="primary"
      className="login-button"
      loading={isLogin}
    >
      支付宝登录
    </Button>
  )
}
