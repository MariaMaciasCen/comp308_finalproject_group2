
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Video = require('./models/Video');
const cors = require('cors');



// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/videolink', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});



// GraphQL 스키마
const schema = buildSchema(`
  type Video {
    id: ID!
    title: String
    description: String
    videoUrl: String
    videoTime: Int
  }

  input VideoInput {
    title: String
    description: String
    videoUrl: String
    videoTime: Int
  }

  type Query {
    videos: [Video]
  }

  type Mutation {
    createVideo(input: VideoInput): Video
  }
`);

// 리졸버
const root = {
    videos: () => Video.find({}),
    createVideo: ({ input }) => {
      const newVideo = new Video({
        title: input.title,
        description: input.description,
        videoUrl: input.videoUrl,
        videoTime: input.videoTime
      });
      return newVideo.save();  // MongoDB에 비디오 데이터 저장
    }
  };

// Express 설정
const app = express();

app.use(cors());  // 모든 도메인의 클라이언트에서 접근 가능하도록 설정

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));