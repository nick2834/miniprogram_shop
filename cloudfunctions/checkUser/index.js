const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {
  const OPENID = cloud.getWXContext().OPENID;
  let phoneId = event.phoneId;
  let password = event.password;
  let msgData = {
    errorCode:200,
    msg: "当前账户已被注册"
  }
  try{
    var res = await db.collection('admin').where({ _openId: OPENID }).get();
    if (res.data.length == 0) {
      return db.collection('admin').add({
        data: {
          _openId: OPENID,
          phoneId: phoneId,
          password: password,
        }
      })
    }else{
      return msgData
    }
  }catch(e){
    console.log(e)
  }
}