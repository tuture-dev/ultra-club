import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
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

  function handleSubmit(e) {
    e.preventDefault()

    const newPosts = posts.concat({ title: formTitle, content: formContent })
    setPosts(newPosts)
    setFormTitle('')
    setFormContent('')
  }

  return (
    <View className="index">
      {posts.map((post, index) => (
        <PostCard key={index} title={post.title} content={post.content} />
      ))}
      <PostForm
        formTitle={formTitle}
        formContent={formContent}
        handleSubmit={e => handleSubmit(e)}
        handleTitleInput={e => setFormTitle(e.target.value)}
        handleContentInput={e => setFormContent(e.target.value)}
      />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}
