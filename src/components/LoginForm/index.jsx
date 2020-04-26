import Taro, { useState, useRef, useEffect } from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'

import { SET_IS_OPENED, SET_LOGIN_INFO } from '../../constants'
import CountDownButton from '../CountDownButton'
import './index.scss'

export default function LoginForm(props) {
  // Login Form 登录数据
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const countDownButtonRef = useRef(null)

  const dispatch = useDispatch()

  async function countDownButtonPressed() {
    if (!phone) {
      Taro.atMessage({
        type: 'error',
        message: '您还没有填写手机!',
      })

      return
    }

    countDownButtonRef.current.startCountDown()

    // 处理发送验证码事件
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // 鉴权数据
    if (!phone || !phoneCode) {
      Taro.atMessage({
        type: 'error',
        message: '您还有内容没有填写！',
      })

      return
    }

    // 处理登录和注册
  }

  return (
    <View className="post-form">
      <Form onSubmit={handleSubmit}>
        <View className="login-box">
          <Input
            className="input-phone input-item"
            type="text"
            placeholder="输入手机号"
            value={phone}
            onInput={e => setPhone(e.target.value)}
          />
          <View className="verify-code-box">
            <Input
              className="input-nickName input-item"
              type="text"
              placeholder="四位验证码"
              value={phoneCode}
              onInput={e => setPhoneCode(e.target.value)}
            />
            <CountDownButton
              onClick={countDownButtonPressed}
              ref={countDownButtonRef}
            />
          </View>
          <AtButton formType="submit" type="primary">
            登录
          </AtButton>
          <View className="at-article__info">
            通过手机和验证码来登录，如果没有账号，我们将自动创建
          </View>
        </View>
      </Form>
    </View>
  )
}
