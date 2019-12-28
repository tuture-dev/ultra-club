import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default function LoggedMine(props) {
  const nickName = useSelector(state => state.user.nickName)
  const avatar = useSelector(state => state.user.avatar)

  function onImageClick() {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className="logged-mine">
      {avatar ? (
        <Image src={avatar} className="mine-avatar" onClick={onImageClick} />
      ) : (
        <AtAvatar size="large" circle text="雀" />
      )}
      <View className="mine-nickName">{nickName}</View>
    </View>
  )
}
