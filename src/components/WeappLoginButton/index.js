import Taro, { useState, useEffect } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import './index.scss'
import { SET_LOGIN_INFO } from '../../constants'
import Authing from '../../utils/authing/authing'

export default function WeappLoginButton(props) {
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useDispatch()

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const userPoolId = '5ea4ffa72b3a80b6eff60b65'
    const authing = new Authing({
      userPoolId,
    })

    async function loginWithAuthing(code, detail) {
      try {
        const userInfo = await authing.loginWithWxapp({
          code,
          detail,
        })

        // 提示登录成功
        Taro.atMessage({
          type: 'success',
          message: '恭喜您，登录成功！',
        })

        const { nickname, photo, _id } = userInfo

        dispatch({
          type: SET_LOGIN_INFO,
          payload: { nickName: nickname, avatar: photo, userId: _id },
        })

        // 向后端发起登录请求
        await Taro.setStorage({
          key: 'userInfo',
          data: {
            nickName: nickname,
            avatar: photo,
            _id,
          },
        })

        await Taro.setStorage({
          key: 'token',
          data: userInfo.token,
        })

        // 当 code 用于登录之后，会失效，所以这里重新获取 code
        Taro.login({
          success(res) {
            const code = res.code
            Taro.setStorageSync('code', code)
          },
        })
      } catch (err) {
        console.log('err', err)
        Taro.atMessage({
          type: 'success',
          message: '恭喜您，登录成功！',
        })
      }
    }

    try {
      const code = Taro.getStorageSync('code')
      Taro.login({
        success(res) {
          const code = res.code
          loginWithAuthing(code, e.detail)
        },
      })
    } catch (err) {
      console.log('err', err)
    }

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
