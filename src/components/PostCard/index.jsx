import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default function PostCard(props) {
  // 注意：
  const { title = '', content = '', user } = props.post
  const { avatar, nickName } = user || {}

  const handleClick = () => {
    // 如果是列表，那么就响应点击事件，跳转到帖子详情
    if (props.isList) {
      Taro.navigateTo({
        url: `/pages/post/post?postId=${props.postId}`,
      })
    }
  }

  const slicedContent =
    props.isList && content.length > 66
      ? `${content.slice(0, 66)} ...`
      : content

  return (
    <View
      className={classNames('at-article', { postcard__isList: props.isList })}
      onClick={handleClick}
    >
      <View className="post-header">
        <View className="at-article__h1">{title}</View>
        <View className="profile-box">
          <AtAvatar circle size="small" image={avatar} />
          <View className="at-article__info post-nickName">{nickName}</View>
        </View>
      </View>
      <View className="at-article__content">
        <View className="at-article__section">
          <View className="at-article__p">{slicedContent}</View>
        </View>
      </View>
    </View>
  )
}

PostCard.defaultProps = {
  isList: '',
  post: [],
}
