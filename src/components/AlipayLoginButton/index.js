import Taro, { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import './index.scss'
import { LOGIN } from '../../constants'

export default function AlipayLoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()

  async function onGetAuthorize(res) {
    setIsLogin(true)
    try {
      let userInfo = await Taro.getOpenUserInfo()

      userInfo = JSON.parse(userInfo.response).response
      const { avatar, nickName } = userInfo

      dispatch({
        type: LOGIN,
        payload: {
          userInfo: {
            avatar,
            nickName,
          },
        },
      })
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
