const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const OPENID = cloud.getWXContext().OPENID;
  let typeName = event.typeName;
  let method = event.method;
  try {
    var res = await db.collection('classify').where({
      _openId: OPENID,
      typeName: typeName
    }).get();
    if (method == 'post'){
      if (res.data.length == 0) {
        return db.collection('classify').add({
          data: {
            _openId: OPENID,
            typeName: typeName
          }
        })
      } else {
        return {
          errorCode: 500,
          msg: "当前分类已存在"
        }
      }
    }else{
      return await db.collection('classify').get({})
    }
    
  } catch (e) {
    console.log(e)
  }
}