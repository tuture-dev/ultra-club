// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { data } = await db.collection('post').get()

    return {
      posts: data,
    }
  } catch (e) {
    console.error(`getPosts ERR: ${e}`)
  }
}
