const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
const request = require('request')
cloud.init()
exports.main = async (event, context) => {
  const fileStream = fs.createReadStream(path.join(event.filePath, ''))
  return await cloud.uploadFile({
    cloudPath: 'demo.jpg',
    fileContent: fileStream,
  })
}