import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function Mine() {
  const dispatch = useDispatch()
  const nickName = useSelector(state => state.user.nickName)

  const isLogged = !!nickName

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName, avatar, _id } = data

        // 更新 Redux Store 数据
        dispatch({
          type: SET_LOGIN_INFO,
          payload: { nickName, avatar, userId: _id },
        })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    if (!isLogged) {
      getStorage()
    }
  })

  return (
    <View className="mine">
      <Header />
      <Footer />
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
