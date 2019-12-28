import Taro, { useState } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'

import { SET_LOGIN_INFO } from '../../constants'

export default function LoginButton(props) {
  const [isLogout, setIsLogout] = useState(false)
  const dispatch = useDispatch()

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })

      dispatch({
        type: SET_LOGIN_INFO,
        payload: {
          avatar: '',
          nickName: '',
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
