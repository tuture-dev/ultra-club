import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux'

import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function Mine() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName, avatar } = data

        // 更新 Redux Store 数据
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName, avatar } })
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    getStorage()
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
