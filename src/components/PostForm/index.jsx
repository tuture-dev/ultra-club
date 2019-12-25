import Taro from '@tarojs/taro'
import { View, Form, Input, Textarea, Button } from '@tarojs/components'

import './index.scss'

export default function PostForm(props) {
  return (
    <View className="post-form">
      <View>添加新的帖子</View>
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
          <Button className="form-button" formType="submit" type="primary">
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
}
