import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import Logout from '../Logout'
import LoginForm from '../LoginForm'
import './index.scss'

export default function Footer(props) {
  // Login Form 登录数据
  const [formNickName, setFormNickName] = useState('')
  const [files, setFiles] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    // 鉴权数据
    if (!formNickName || !files.length) {
      Taro.atMessage({
        type: 'error',
        message: '您还有内容没有填写！',
      })

      return
    }

    // 提示登录成功
    Taro.atMessage({
      type: 'success',
      message: '恭喜您，登录成功！',
    })

    // 缓存在 storage 里面
    const userInfo = { avatar: files[0].url, nickName: formNickName }
    await props.handleSubmit(userInfo)

    // 清空表单状态
    setFiles([])
    setFormNickName('')
  }

  return (
    <View className="mine-footer">
      {props.isLogged && (
        <Logout loading={props.isLogout} handleLogout={props.handleLogout} />
      )}
      <View className="tuture-motto">
        {props.isLogged ? 'From 图雀社区 with Love ❤' : '您还未登录'}
      </View>
      <AtFloatLayout
        isOpened={props.isOpened}
        title="登录"
        onClose={() => props.handleSetIsOpened(false)}
      >
        <LoginForm
          formNickName={formNickName}
          files={files}
          handleSubmit={e => handleSubmit(e)}
          handleNickNameInput={e => setFormNickName(e.target.value)}
          handleFilesSelect={files => setFiles(files)}
        />
      </AtFloatLayout>
    </View>
  )
}
