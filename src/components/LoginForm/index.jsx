import Taro, { useState } from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'

import './index.scss'

export default function LoginForm(props) {
  const [showAddBtn, setShowAddBtn] = useState(true)

  function onChange(files) {
    if (files.length > 0) {
      setShowAddBtn(false)
    }

    props.handleFilesSelect(files)
  }

  function onImageClick() {
    Taro.previewImage({
      urls: [props.files[0].url],
    })
  }

  return (
    <View className="post-form">
      <Form onSubmit={props.handleSubmit}>
        <View className="login-box">
          <View className="avatar-selector">
            <AtImagePicker
              length={1}
              mode="scaleToFill"
              count={1}
              files={props.files}
              showAddBtn={showAddBtn}
              onImageClick={onImageClick}
              onChange={onChange}
            />
          </View>
          <Input
            className="input-nickName"
            type="text"
            placeholder="点击输入昵称"
            value={props.formNickName}
            onInput={props.handleNickNameInput}
          />
          <AtButton formType="submit" type="primary">
            登录
          </AtButton>
        </View>
      </Form>
    </View>
  )
}
