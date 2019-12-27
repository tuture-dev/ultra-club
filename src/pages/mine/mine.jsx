import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { Header, Footer } from '../../components'
import './mine.scss'

export default function Mine() {
  const [nickName, setNickName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [isLogout, setIsLogout] = useState(false)

  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录
  const isLogged = !!nickName

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })

        const { nickName, avatar } = data
        setAvatar(avatar)
        setNickName(nickName)
      } catch (err) {
        console.log('getStorage ERR: ', err)
      }
    }

    getStorage()
  })

  async function setLoginInfo(avatar, nickName) {
    setAvatar(avatar)
    setNickName(nickName)

    try {
      await Taro.setStorage({
        key: 'userInfo',
        data: { avatar, nickName },
      })
    } catch (err) {
      console.log('setStorage ERR: ', err)
    }
  }

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })

      setAvatar('')
      setNickName('')
    } catch (err) {
      console.log('removeStorage ERR: ', err)
    }

    setIsLogout(false)
  }

  function handleSetIsOpened(isOpened) {
    setIsOpened(isOpened)
  }

  function handleClick() {
    handleSetIsOpened(true)
  }

  async function handleSubmit(userInfo) {
    // 缓存在 storage 里面
    await Taro.setStorage({ key: 'userInfo', data: userInfo })

    // 设置本地信息
    setAvatar(userInfo.avatar)
    setNickName(userInfo.nickName)

    // 关闭弹出层
    setIsOpened(false)
  }

  return (
    <View className="mine">
      <Header
        isLogged={isLogged}
        userInfo={{ avatar, nickName }}
        handleClick={handleClick}
        setLoginInfo={setLoginInfo}
      />
      <Footer
        isLogged={isLogged}
        isOpened={isOpened}
        isLogout={isLogout}
        handleLogout={handleLogout}
        handleSetIsOpened={handleSetIsOpened}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
