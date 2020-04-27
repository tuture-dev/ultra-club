// 云函数入口文件
const cloud = require('wx-server-sdk')
const Authing = require('authing-js-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { postData, userId } = event

  const userPoolId = ''
  const secret = ''

  try {
    const authing = new Authing({
      userPoolId,
      secret,
    })
    const userInfo = await authing.user({ id: userId })
    const { nickname, photo } = userInfo

    const { _id } = await db.collection('post').add({
      data: {
        ...postData,
        user: { nickName: nickname, avatar: photo, _id: userInfo._id },
        createdAt: db.serverDate(),
        updatedAt: db.serverDate(),
      },
    })

    const newPost = await db
      .collection('post')
      .doc(_id)
      .get()

    return {
      post: { ...newPost.data },
    }
  } catch (err) {
    console.error(`createUser ERR: ${err}`)
  }
}
