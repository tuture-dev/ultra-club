import Taro, { useState } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'

import { SET_LOGIN_INFO } from '../../constants'
import Authing from '../../utils/authing/authing'

export default function LoginButton(props) {
  const [isLogout, setIsLogout] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.userId)

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })
      await Taro.removeStorage({ key: 'token' })

      const userPoolId = ''
      const authing = new Authing({
        userPoolId,
      })

      await authing.logout(userId)

      dispatch({
        type: SET_LOGIN_INFO,
        payload: {
          avatar: '',
          nickName: '',
          userId: '',
        },
      })
    } catch (err) {
      console.log('removeStorage ERR: ', err)
    }

    setIsLogout(false)
  }

  return (
    <AtButton type="secondary" full loading={isLogout} onClick={handleLogout}>
      退出登录
    </AtButton>
  )
}
