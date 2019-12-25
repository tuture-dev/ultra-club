import Taro from '@tarojs/taro'
import { View, Form, Input, Textarea, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

export default function PostForm(props) {
  return (
    <View className="post-form">
      <Form onSubmit={props.handleSubmit}>
        <View>
          <View className="form-hint">标题</View>
          <Input
            className="input-title"
            type="text"
            placeholder="点击输入标题"
            value={props.formTitle}
            onInput={props.handleTitleInput}
          />
          <View className="form-hint">正文</View>
          <Textarea
            placeholder="点击输入正文"
            className="input-content"
            value={props.formContent}
            onInput={props.handleContentInput}
          />
          <AtButton formType="submit" type="primary">
            提交
          </AtButton>
        </View>
      </Form>
    </View>
  )
}
