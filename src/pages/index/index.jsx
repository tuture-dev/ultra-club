import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'

import { PostCard, PostForm } from '../../components'
import './index.scss'

export default function Index() {
  const [posts, setPosts] = useState([
    {
      title: '泰罗奥特曼',
      content: '泰罗是奥特之父和奥特之母唯一的亲生儿子。',
    },
  ])
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const newPosts = posts.concat({ title: formTitle, content: formContent })
    setPosts(newPosts)
    setFormTitle('')
    setFormContent('')
    setIsOpened(false)

    Taro.atMessage({
      message: '发表文章成功',
      type: 'success',
    })
  }

  return (
    <View className="index">
      <AtMessage />
      {posts.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          content={post.content}
          isList
        />
      ))}
      <AtFloatLayout
        isOpened={isOpened}
        title="发表新文章"
        onClose={() => setIsOpened(false)}
      >
        <PostForm
          formTitle={formTitle}
          formContent={formContent}
          handleSubmit={e => handleSubmit(e)}
          handleTitleInput={e => setFormTitle(e.target.value)}
          handleContentInput={e => setFormContent(e.target.value)}
        />
      </AtFloatLayout>
      <View className="post-button">
        <AtFab onClick={() => setIsOpened(true)}>
          <Text className="at-fab__icon at-icon at-icon-edit"></Text>
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
