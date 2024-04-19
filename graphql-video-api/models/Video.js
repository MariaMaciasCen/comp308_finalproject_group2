const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  videoTime: Number // 비디오 재생 시간 필드를 초 단위로 추가
});

module.exports = mongoose.model('Video', videoSchema);