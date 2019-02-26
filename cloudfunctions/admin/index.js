const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const OPENID = cloud.getWXContext().OPENID
  let phoneId = event.phoneId;
  let password = event.password;
  try {
    return await db.collection('admin').add({
      data: {
        _openId: OPENID,
        phoneId: phoneId,
        password: password,
      }
    })
  } catch (e) {
    console.error(e)
  }
}