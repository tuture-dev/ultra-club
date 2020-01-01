import Taro, { useState } from '@tarojs/taro'
import { View, Form, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'

import './index.scss'
import { CREATE_POST } from '../../constants'

export default function PostForm() {
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')

  const userId = useSelector(state => state.user.userId)

  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formTitle || !formContent) {
      Taro.atMessage({
        message: '您还有内容没有填写完哦',
        type: 'warning',
      })

      return
    }

    dispatch({
      type: CREATE_POST,
      payload: {
        postData: {
          title: formTitle,
          content: formContent,
        },
        userId,
      },
    })

    setFormTitle('')
    setFormContent('')
  }

  return (
    <View className="post-form">
      <Form onSubmit={handleSubmit}>
        <View>
          <View className="form-hint">标题</View>
          <Input
            className="input-title"
            type="text"
            placeholder="点击输入标题"
            value={formTitle}
            onInput={e => setFormTitle(e.target.value)}
          />
          <View className="form-hint">正文</View>
          <Textarea
            placeholder="点击输入正文"
            className="input-content"
            value={formContent}
            onInput={e => setFormContent(e.target.value)}
          />
          <AtButton formType="submit" type="primary">
            提交
          </AtButton>
        </View>
      </Form>
    </View>
  )
}
