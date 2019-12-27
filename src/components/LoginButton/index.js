import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'

export default function LoginButton(props) {
  return (
    <AtButton type="primary" onClick={props.handleClick}>
      普通登录
    </AtButton>
  )
}
