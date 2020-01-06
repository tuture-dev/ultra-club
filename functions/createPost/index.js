// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { postData, userId } = event

  console.log('event', event)

  try {
    const user = await db
      .collection('user')
      .doc(userId)
      .get()
    const { _id } = await db.collection('post').add({
      data: {
        ...postData,
        user: user.data,
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
