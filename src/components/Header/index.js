import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import LoggedMine from '../LoggedMine'
import LoginButton from '../LoginButton'
import WeappLoginButton from '../WeappLoginButton'
import AlipayLoginButton from '../AlipayLoginButton'

import './index.scss'

export default function Header(props) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

  return (
    <View className="user-box">
      <AtMessage />
      <LoggedMine userInfo={props.userInfo} />
      {!props.isLogged && (
        <View className="login-button-box">
          <LoginButton handleClick={props.handleClick} />
          {isWeapp && <WeappLoginButton setLoginInfo={props.setLoginInfo} />}
          {isAlipay && <AlipayLoginButton setLoginInfo={props.setLoginInfo} />}
        </View>
      )}
    </View>
  )
}
