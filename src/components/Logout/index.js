import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'

export default function LoginButton(props) {
  return (
    <AtButton
      type="secondary"
      full
      loading={props.loading}
      onClick={props.handleLogout}
    >
      退出登录
    </AtButton>
  )
}
