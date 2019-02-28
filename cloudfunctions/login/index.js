const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {
  const OPENID = cloud.getWXContext().OPENID;
  let phoneId = event.phoneId;
  let password = event.password;
  try {
    var res = await db.collection('admin').where({
      _openId: OPENID,
      phoneId: phoneId,
      password: password
    }).get();
    if (res.data.length == 0) {
      return {
        errorCode: 500,
        msg: "账户或密码错误，请重新登录！"
      }
    } else {
      return {
        errorCode: 200,
        msg: "登录成功！",
        loginInfo:res
      }
    }
  } catch (e) {
    console.log(e)
  }
}